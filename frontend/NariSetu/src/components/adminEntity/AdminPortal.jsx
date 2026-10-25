import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminOverview from './AdminOverview';
import AdminVerificationQueue from './AdminVerificationQueue';
import AdminOrganizations from './AdminOrganizations';
import AdminCommunities from './AdminCommunities';
import AdminOpportunities from './AdminOpportunities';
import AdminFlaggedContent from './AdminFlaggedContent';
import AdminAuditLog from './AdminAuditLog';
import AdminUsersAndRoles from './AdminUsersAndRoles';
import AdminSettings from './AdminSettings';
import { api } from '../../api';

// Modals
import DocumentViewerModal from './DocumentViewerModal';
import RegisterOrgModal from './RegisterOrgModal';
import RegisterCollectiveModal from './RegisterCollectiveModal';
import CreateDispatchModal from './CreateDispatchModal';
import RequestDocsModal from './RequestDocsModal';

// Mock Data
import {
  adminMetrics,
  partnerActivityByType,
  initialVerificationQueue,
  initialOrganizations,
  initialCommunities,
  initialOpportunities,
  initialFlaggedContent,
  initialAuditLogs
} from './adminData';

export default function AdminPortal({
  currentUser,
  onNotify,
  onLogout,
  onGoHome,
  initialTab = 'overview'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Core Data States
  const [metrics, setMetrics] = useState(adminMetrics);
  const [verificationQueue, setVerificationQueue] = useState(initialVerificationQueue);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [communities, setCommunities] = useState(initialCommunities);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [flaggedContent, setFlaggedContent] = useState(initialFlaggedContent);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [partnerActivity, setPartnerActivity] = useState(partnerActivityByType);
  const [isLoading, setIsLoading] = useState(false);

  // Modal States
  const [docViewerOpen, setDocViewerOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [registerOrgOpen, setRegisterOrgOpen] = useState(false);
  const [registerCollectiveOpen, setRegisterCollectiveOpen] = useState(false);
  const [createDispatchOpen, setCreateDispatchOpen] = useState(false);

  const [requestDocsOpen, setRequestDocsOpen] = useState(false);
  const [selectedEntityForDocs, setSelectedEntityForDocs] = useState(null);

  // Load live data from Backend API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        const [
          metricsRes,
          queueRes,
          orgsRes,
          commsRes,
          oppsRes,
          flagsRes,
          logsRes
        ] = await Promise.allSettled([
          api.getAdminMetrics(),
          api.getAdminVerificationQueue(),
          api.getAdminOrganizations(),
          api.getAdminCommunities(),
          api.getAdminOpportunities(),
          api.getAdminFlags(),
          api.getAdminAuditLogs()
        ]);

        if (!isMounted) return;

        if (metricsRes.status === 'fulfilled' && metricsRes.value?.metrics) {
          setMetrics(metricsRes.value.metrics);
        }
        if (queueRes.status === 'fulfilled' && queueRes.value?.queue?.length > 0) {
          setVerificationQueue(queueRes.value.queue);
        }
        if (orgsRes.status === 'fulfilled' && orgsRes.value?.organizations?.length > 0) {
          setOrganizations(orgsRes.value.organizations);
        }
        if (commsRes.status === 'fulfilled' && commsRes.value?.communities?.length > 0) {
          setCommunities(commsRes.value.communities);
        }
        if (oppsRes.status === 'fulfilled' && oppsRes.value?.opportunities?.length > 0) {
          setOpportunities(oppsRes.value.opportunities);
        }
        if (flagsRes.status === 'fulfilled' && flagsRes.value?.flags?.length > 0) {
          setFlaggedContent(flagsRes.value.flags);
        }
        if (logsRes.status === 'fulfilled' && logsRes.value?.logs?.length > 0) {
          setAuditLogs(logsRes.value.logs);
        }
      } catch {
        // Retain initial fallback data safely
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAdminData();
    return () => { isMounted = false; };
  }, []);

  // Handle Document View
  const handleOpenDocViewer = (doc) => {
    setSelectedDoc(doc);
    setDocViewerOpen(true);
  };

  // Toggle Document Verification Status inside Modal
  const handleToggleDocStatus = async (docId) => {
    let targetItem = null;
    let updatedDocs = [];
    let newDocsRatio = '';
    let newDocsStatus = '';

    setVerificationQueue((prevQueue) =>
      prevQueue.map((item) => {
        const hasDoc = item.documents?.some((d) => d.id === docId);
        if (!hasDoc) return item;

        updatedDocs = item.documents.map((d) =>
          d.id === docId
            ? {
                ...d,
                verified: !d.verified,
                status: !d.verified ? 'Verified' : 'Pending Review'
              }
            : d
        );

        const verifiedCount = updatedDocs.filter((d) => d.verified).length;
        const totalCount = updatedDocs.length;
        newDocsRatio = `${verifiedCount}/${totalCount}`;
        newDocsStatus = `${verifiedCount}/${totalCount} ${verifiedCount < totalCount ? '1 pending' : 'Complete'}`;

        targetItem = {
          ...item,
          documents: updatedDocs,
          docsRatio: newDocsRatio,
          docsStatus: newDocsStatus
        };

        return targetItem;
      })
    );

    if (targetItem) {
      try {
        await api.updateVerificationItem(targetItem.id, {
          documents: updatedDocs,
          docsRatio: newDocsRatio,
          docsStatus: newDocsStatus
        });
      } catch {
        // Handled silently
      }
    }
  };

  // Handle Register New Organization
  const handleRegisterOrg = async (newOrg) => {
    setOrganizations((prev) => [newOrg, ...prev]);
    const newAudit = {
      id: `audit-${Date.now()}`,
      action: `New organization registered: ${newOrg.name}`,
      detail: `Reg ID: ${newOrg.regId}`,
      reviewer: currentUser?.name || 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Organization'
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    try {
      await api.createAdminOrganization(newOrg);
    } catch {
      // Retained in local state
    }
  };

  // Handle Register New Collective
  const handleRegisterCollective = async (newComm) => {
    setCommunities((prev) => [newComm, ...prev]);
    const newAudit = {
      id: `audit-${Date.now()}`,
      action: `New collective registered: ${newComm.name}`,
      detail: `Block: ${newComm.location}`,
      reviewer: currentUser?.name || 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Organization'
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    try {
      await api.createAdminCommunity(newComm);
    } catch {
      // Retained in local state
    }
  };

  // Handle Create Opportunity Dispatch
  const handleCreateDispatch = async (newOpp) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    const newAudit = {
      id: `audit-${Date.now()}`,
      action: `Admin dispatch published: ${newOpp.title}`,
      detail: `Region: ${newOpp.region}`,
      reviewer: currentUser?.name || 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Moderation'
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    try {
      await api.createAdminOpportunity(newOpp);
    } catch {
      // Retained in local state
    }
  };

  // Handle Request Docs from Partner
  const handleOpenRequestDocs = (entity) => {
    setSelectedEntityForDocs(entity);
    setRequestDocsOpen(true);
  };

  const handleSubmitDocRequest = async (req) => {
    const newAudit = {
      id: `audit-${Date.now()}`,
      action: `Document requested for ${req.entityName}`,
      detail: `${req.docType} (${req.urgency})`,
      reviewer: currentUser?.name || 'Administrator',
      date: 'Just now',
      dotColor: 'bg-blue-500',
      category: 'Verification'
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    try {
      await api.createAdminAuditLog(newAudit);
    } catch {
      // Local state updated
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onLogout={onLogout}
      onGoHome={onGoHome}
      currentUser={currentUser}
      verificationCount={verificationQueue.filter((q) => q.status !== 'Verified').length}
      flaggedCount={flaggedContent.filter((f) => f.status !== 'Resolved').length}
    >
      {/* 1. OVERVIEW VIEW (IMAGE 1) */}
      {activeTab === 'overview' && (
        <AdminOverview
          metrics={metrics}
          verificationQueue={verificationQueue}
          flaggedContent={flaggedContent}
          auditLogs={auditLogs}
          partnerActivity={partnerActivity}
          onNavigateTab={setActiveTab}
          onInspectEntity={(entity) => {
            setActiveTab('verification');
          }}
          onRequestDocs={handleOpenRequestDocs}
          onNotify={onNotify}
        />
      )}

      {/* 2. VERIFICATION QUEUE (IMAGE 2) */}
      {activeTab === 'verification' && (
        <AdminVerificationQueue
          queue={verificationQueue}
          onUpdateQueue={setVerificationQueue}
          onOpenDocViewer={handleOpenDocViewer}
          onRequestDocs={handleOpenRequestDocs}
          onNotify={onNotify}
        />
      )}

      {/* 3. REGISTERED ORGANIZATIONS (IMAGE 3) */}
      {activeTab === 'organizations' && (
        <AdminOrganizations
          organizations={organizations}
          onOpenRegisterModal={() => setRegisterOrgOpen(true)}
          onNotify={onNotify}
        />
      )}

      {/* 4. COMMUNITIES & SHGS (IMAGE 4) */}
      {activeTab === 'communities' && (
        <AdminCommunities
          communities={communities}
          onOpenRegisterModal={() => setRegisterCollectiveOpen(true)}
          onNotify={onNotify}
        />
      )}

      {/* 5. OPPORTUNITIES MODERATION (IMAGE 5) */}
      {activeTab === 'opportunities' && (
        <AdminOpportunities
          opportunities={opportunities}
          onUpdateOpportunities={setOpportunities}
          onOpenCreateDispatch={() => setCreateDispatchOpen(true)}
          onNotify={onNotify}
        />
      )}

      {/* 6. FLAGGED CONTENT */}
      {activeTab === 'flagged' && (
        <AdminFlaggedContent
          flaggedContent={flaggedContent}
          onUpdateFlags={setFlaggedContent}
          onNotify={onNotify}
        />
      )}

      {/* 7. AUDIT LOG */}
      {activeTab === 'audit' && (
        <AdminAuditLog
          auditLogs={auditLogs}
          onNotify={onNotify}
        />
      )}

      {/* 8. USERS & ROLES */}
      {activeTab === 'users' && (
        <AdminUsersAndRoles
          currentUser={currentUser}
          onNotify={onNotify}
        />
      )}

      {/* 9. SETTINGS */}
      {activeTab === 'settings' && (
        <AdminSettings onNotify={onNotify} />
      )}

      {/* ========================================================= */}
      {/* MODALS */}
      {/* ========================================================= */}
      <DocumentViewerModal
        isOpen={docViewerOpen}
        document={selectedDoc}
        onClose={() => {
          setDocViewerOpen(false);
          setSelectedDoc(null);
        }}
        onToggleStatus={handleToggleDocStatus}
        onNotify={onNotify}
      />

      <RegisterOrgModal
        isOpen={registerOrgOpen}
        onClose={() => setRegisterOrgOpen(false)}
        onSubmit={handleRegisterOrg}
        onNotify={onNotify}
      />

      <RegisterCollectiveModal
        isOpen={registerCollectiveOpen}
        onClose={() => setRegisterCollectiveOpen(false)}
        onSubmit={handleRegisterCollective}
        onNotify={onNotify}
      />

      <CreateDispatchModal
        isOpen={createDispatchOpen}
        onClose={() => setCreateDispatchOpen(false)}
        onSubmit={handleCreateDispatch}
        onNotify={onNotify}
      />

      <RequestDocsModal
        isOpen={requestDocsOpen}
        entity={selectedEntityForDocs}
        onClose={() => {
          setRequestDocsOpen(false);
          setSelectedEntityForDocs(null);
        }}
        onSubmit={handleSubmitDocRequest}
        onNotify={onNotify}
      />

    </AdminLayout>
  );
}
