// client/src/components/LeadInbox.jsx
import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, PhoneCall, Sparkles, MessageSquare, UserCheck, Search, Filter, ShieldCheck, ChevronRight, Copy, Check, Send, UserX, ArrowRightLeft, ShieldAlert } from 'lucide-react';

export default function LeadInbox({ t, currentUser }) {
  const role = currentUser?.role || 'sales_consultant';
  const isConsultant = role === 'sales_consultant';
  const canReassign = ['lead_supervisor', 'admin', 'dealer_principal'].includes(role);

  const [leads, setLeads] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  // Contact modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactChannel, setContactChannel] = useState('Phone Call (Connected)');
  const [contactNote, setContactNote] = useState('Spoke with customer. Discussed Lucknow on-road quote and offered showroom demo.');
  const [submittingContact, setSubmittingContact] = useState(false);

  // Reassignment modal state
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [targetConsultantId, setTargetConsultantId] = useState('EMP-02');
  const [reassignReason, setReassignReason] = useState('5-minute SLA breach escalation / workload rebalance');
  const [reassigning, setReassigning] = useState(false);

  // Quick-Reply & Customer Profile state
  const [templateLoading, setTemplateLoading] = useState(false);
  const [buyerRequirement, setBuyerRequirement] = useState('');
  const [messageDraft, setMessageDraft] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const fetchLeads = async () => {
    try {
      let url = '/api/consultant/leads?';
      if (statusFilter) url += `status=${statusFilter}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const res = await fetch(url, {
        headers: { 'x-user-id': currentUser.id }
      });
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
        setSummary(json.summary);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Poll every 5 seconds for real-time SLA countdown
  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 5000);
    return () => clearInterval(interval);
  }, [statusFilter, search, currentUser.id]);

  const handleRecordContact = async (leadId) => {
    try {
      setSubmittingContact(true);
      const res = await fetch(`/api/leads/${leadId}/contact`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify({
          contactChannel,
          note: contactNote
        })
      });
      const json = await res.json();
      if (json.success) {
        setContactModalOpen(false);
        fetchLeads();
        if (selectedLead && selectedLead.leadId === leadId) {
          setSelectedLead(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to record contact:', err);
    } finally {
      setSubmittingContact(false);
    }
  };

  const handleReassignLead = async (leadId) => {
    try {
      setReassigning(true);
      const res = await fetch(`/api/leads/${leadId}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify({
          consultantId: targetConsultantId,
          reason: reassignReason
        })
      });
      const json = await res.json();
      if (json.success) {
        setReassignModalOpen(false);
        fetchLeads();
        if (selectedLead && selectedLead.leadId === leadId) {
          setSelectedLead(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to reassign lead:', err);
    } finally {
      setReassigning(false);
    }
  };

  const loadQuickReplyTemplate = async (lead) => {
    try {
      setTemplateLoading(true);
      setCopiedDraft(false);

      // Call Customer Summary API
      const resSum = await fetch('/api/leads/buyer-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: lead.customerName,
          modelInterest: lead.modelInterest,
          preferredLanguage: lead.preferredLanguage,
          budget: lead.budget,
          enquiryText: lead.buyerSummary || ''
        })
      });
      const jsonSum = await resSum.json();
      if (jsonSum.success) {
        setBuyerRequirement(jsonSum.summary);
      }

      // Call First-Reply Draft API
      const resDraft = await fetch('/api/leads/reply-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: lead.customerName,
          modelInterest: lead.modelInterest,
          preferredLanguage: lead.preferredLanguage,
          consultantName: lead.assignedUserName || currentUser.name
        })
      });
      const jsonDraft = await resDraft.json();
      if (jsonDraft.success) {
        setMessageDraft(jsonDraft.draft);
      }
    } catch (err) {
      console.error('Template loading failed:', err);
    } finally {
      setTemplateLoading(false);
    }
  };

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Workspace Title & Live SLA Banner */}
        <div className="bg-slate-950/90 text-white rounded-3xl p-6 shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold tracking-wide mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>5-MINUTE RESPONSE SLA WATCHDOG</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {isConsultant ? `${currentUser.name} — My Lead Workspace` : 'Lead Desk & Supervisor Workspace'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {isConsultant ? (
                  <span className="text-sky-300 font-medium">
                    🔒 My Assigned Leads: Viewing enquiries assigned to you for direct customer follow-up.
                  </span>
                ) : (
                  <span>
                    Supervisor Oversight (All 3 Showrooms): Monitoring live 5-minute response times and showroom follow-ups across Lucknow.
                  </span>
                )}
              </p>
            </div>

            {/* SLA Compliance Stat Meter */}
            {summary && (
              <div className="flex items-center space-x-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">5-Min SLA Compliance</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-emerald-400">{summary.slaCompliancePct}%</span>
                    <span className="text-xs text-slate-400">/ 90% Target</span>
                  </div>
                </div>

                <div className="border-l border-slate-800 pl-4 space-y-1 text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{summary.metCount} Met (&lt;5m)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{summary.activeTimerCount} Active Timers</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-red-400 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{summary.breachedCount} Breached</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-700 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search lead ID, customer name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-400 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80 focus:border-sky-500"
                style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="filter-lead-status" className="text-xs font-semibold text-slate-400">Status:</label>
              <select
                id="filter-lead-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-300 focus:outline-sky-500 bg-white text-black font-semibold cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Assigned">Assigned (Active)</option>
                <option value="Contacted">Contacted</option>
                <option value="Test Drive Scheduled">Test Drive Scheduled</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-white">{leads.length}</strong> active enquiries
          </div>
        </div>

        {/* Main Leads Table / Cards */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Streaming real-time lead inbox...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-slate-950 rounded-2xl p-12 text-center border border-slate-800">
            <UserCheck className="w-12 h-12 text-slate-500 mx-auto mb-2" />
            <h4 className="font-bold text-white text-sm">No leads match your active role scope</h4>
            <p className="text-xs text-slate-400 mt-1">
              {isConsultant ? 'You have no assigned leads pending first call.' : 'Try adjusting the search filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Lead Cards List */}
            <div className="lg:col-span-7 space-y-3">
              {leads.map((lead) => {
                const sla = lead.sla;
                const isBreached = sla.status === 'breached';
                const isActive = sla.status === 'active';
                const isMet = sla.status === 'met';
                const isSelected = selectedLead && selectedLead.leadId === lead.leadId;

                return (
                  <div
                    key={lead.leadId}
                    onClick={() => {
                      setSelectedLead(lead);
                      loadQuickReplyTemplate(lead);
                    }}
                    className={`bg-slate-950/80 rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-md hover:border-sky-500 ${
                      isSelected ? 'border-sky-500 ring-2 ring-sky-500/30' : 'border-slate-800'
                    }`}
                  >
                    {/* Top Row: Lead ID, Source, SLA Timer Badge */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold bg-slate-900 text-slate-200 border border-slate-800 px-2 py-0.5 rounded-lg">
                          {lead.leadId}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {lead.source}
                        </span>
                        <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.2 rounded border border-slate-800 font-medium">
                          Lang: {lead.preferredLanguage}
                        </span>
                      </div>

                      {/* 5-Minute SLA Status Badge */}
                      <div>
                        {isActive && (
                          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] font-bold animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>{Math.floor(sla.remainingSeconds / 60)}m {sla.remainingSeconds % 60}s remaining</span>
                          </div>
                        )}

                        {isBreached && (
                          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-[11px] font-bold">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            <span>SLA BREACHED (Escalated)</span>
                          </div>
                        )}

                        {isMet && (
                          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Called in {sla.responseTimeSeconds}s</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Middle Row: Customer Info & Interested Car */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-base font-bold text-white">{lead.customerName}</h4>
                        <p className="text-xs text-slate-400 font-mono">{lead.phone}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-sky-400 block">{lead.modelInterest}</span>
                        <span className="text-[11px] text-slate-400">{lead.showroomName}</span>
                      </div>
                    </div>

                    {/* Bottom Row: Consultant Assigned & DPDP Verified Badge */}
                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                        <span>Owner: <strong className="text-slate-200">{lead.assignedUserName}</strong></span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.status === 'Contacted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          lead.status === 'Test Drive Scheduled' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                          'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}>
                          {lead.status}
                        </span>

                        <span className="text-[10px] text-slate-400 flex items-center space-x-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>DPDP Consent OK</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Lead Action & Communications Panel */}
            <div className="lg:col-span-5">
              {selectedLead ? (
                <div className="bg-slate-950/90 rounded-3xl border border-slate-800 shadow-2xl p-5 sticky top-24 space-y-5">
                  {/* Lead Header */}
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Workspace</span>
                      <h3 className="text-lg font-black text-white">{selectedLead.customerName}</h3>
                      <p className="text-xs text-slate-400 font-mono">{selectedLead.phone}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {canReassign && (
                        <button
                          onClick={() => setReassignModalOpen(true)}
                          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold px-2.5 py-2 rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
                          title="Reassign to another consultant (Supervisor permission)"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                          <span>Reassign</span>
                        </button>
                      )}

                      <button
                        onClick={() => setContactModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Record Contact</span>
                      </button>
                    </div>
                  </div>

                  {/* Operational Status */}
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Interested Car:</span>
                      <span className="font-bold text-white">{selectedLead.modelInterest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Showroom:</span>
                      <span className="font-bold text-white">{selectedLead.showroomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Human First Contact:</span>
                      <span className="font-bold text-emerald-400">
                        {selectedLead.firstContactAt
                          ? new Date(selectedLead.firstContactAt).toLocaleTimeString()
                          : 'Pending (5-Min SLA Active)'}
                      </span>
                    </div>
                  </div>

                  {/* Communications & Customer Profile Section */}
                  <div className="border border-sky-500/30 bg-sky-950/30 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1.5">
                        <MessageSquare className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                          Consultant Response Desk & Customer Profile
                        </span>
                      </div>
                      {templateLoading && <span className="text-[10px] text-sky-400 animate-pulse">Loading template...</span>}
                    </div>

                    {/* Customer Requirements Summary */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-300 block mb-1">
                        Customer Inquiry & Requirement Summary:
                      </span>
                      <p className="text-xs text-slate-200 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                        {buyerRequirement || selectedLead.buyerSummary}
                      </p>
                    </div>

                    {/* Quick-Reply Template */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-bold text-slate-300">
                          Official First-Reply Template ({selectedLead.preferredLanguage}):
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(messageDraft);
                            setCopiedDraft(true);
                            setTimeout(() => setCopiedDraft(false), 2000);
                          }}
                          className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1 cursor-pointer"
                        >
                          {copiedDraft ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedDraft ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <textarea
                        rows="4"
                        value={messageDraft}
                        onChange={(e) => setMessageDraft(e.target.value)}
                        className="w-full text-sm p-3 bg-white rounded-xl border-2 border-slate-400 text-black font-bold placeholder:text-black placeholder:opacity-80 focus:border-sky-500 leading-relaxed"
                        style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                        placeholder="Response template for consultant review..."
                      />
                      <span className="text-[10px] text-slate-500 block mt-1">
                        * Consultant must review and personalize message prior to dispatch.
                      </span>
                    </div>
                  </div>

                  {/* Audit Trail & Notes */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Activity Notes & SLA Log:
                    </span>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1.5 max-h-36 overflow-y-auto">
                      {selectedLead.notes && selectedLead.notes.map((n, i) => (
                        <div key={i} className="text-slate-300 text-[11px] pb-1 border-b border-slate-800/80 last:border-b-0">
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/80 rounded-3xl border border-slate-800 p-10 text-center text-slate-500">
                  <PhoneCall className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs">Select any lead from the inbox to review customer requirements and record human first contact.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Record Human First Contact */}
        {contactModalOpen && selectedLead && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-slate-100">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-white text-sm">Record Human First Contact</h4>
                </div>
                <button onClick={() => setContactModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <p className="text-xs text-slate-300">
                Logging this contact event will officially satisfy and stop the 5-Minute SLA timer for <strong>{selectedLead.customerName}</strong>.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Channel Used:</label>
                <select
                  value={contactChannel}
                  onChange={(e) => setContactChannel(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white text-black font-semibold cursor-pointer"
                >
                  <option value="Phone Call (Connected)">Phone Call (Connected)</option>
                  <option value="WhatsApp Business Chat">WhatsApp Business Chat</option>
                  <option value="Direct In-Person Showroom Interaction">Direct In-Person Showroom Interaction</option>
                  <option value="Call Attempted (Ringing / No Answer)">Call Attempted (Ringing / No Answer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Consultant Notes:</label>
                <textarea
                  rows="3"
                  value={contactNote}
                  onChange={(e) => setContactNote(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border-2 border-slate-400 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                  placeholder="Record customer response, preferred demo date, or financing query..."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submittingContact}
                  onClick={() => handleRecordContact(selectedLead.leadId)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow-md"
                >
                  {submittingContact ? 'Saving...' : 'Confirm Contact & Stop Timer'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Reassign Lead (Supervisor / Admin Only) */}
        {reassignModalOpen && selectedLead && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-800 text-slate-100">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white text-sm">Supervisor Lead Reassignment</h4>
                </div>
                <button onClick={() => setReassignModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <p className="text-xs text-slate-300">
                Reassign <strong>{selectedLead.customerName}</strong> ({selectedLead.leadId}) to a new sales consultant:
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target Consultant:</label>
                <select
                  value={targetConsultantId}
                  onChange={(e) => setTargetConsultantId(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white text-black font-semibold cursor-pointer"
                >
                  <option value="EMP-01">Rajesh Sharma (Hazratganj Flagship)</option>
                  <option value="EMP-02">Priya Verma (Gomti Nagar Showroom)</option>
                  <option value="EMP-03">Amit Tripathi (Kanpur Road Showroom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Reason for Reassignment:</label>
                <input
                  type="text"
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border-2 border-slate-400 bg-white text-black font-bold placeholder:text-black placeholder:opacity-80"
                  style={{ color: '#000000', WebkitTextFillColor: '#000000', backgroundColor: '#ffffff', fontWeight: 700 }}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReassignModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={reassigning}
                  onClick={() => handleReassignLead(selectedLead.leadId)}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  {reassigning ? 'Reassigning...' : 'Confirm Reassignment'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
