import React, { useState } from 'react';
import NgoLayout from './NgoLayout';
import NgoDashboard from './NgoDashboard';
import NgoProfile from './NgoProfile';
import NgoCommunities from './NgoCommunities';
import NgoOpportunities from './NgoOpportunities';
import NgoTrainingEvents from './NgoTrainingEvents';
import NgoReports from './NgoReports';
import NgoMessages from './NgoMessages';

import CreateOpportunityModal from './CreateOpportunityModal';
import RequestPartnershipModal from './RequestPartnershipModal';
import ViewCommunityModal from './ViewCommunityModal';

import {
  initialNgoProfile,
  ngoMetrics,
  recentActivities,
  upcomingEvents,
  allCommunities,
  allOpportunities
} from './ngoData';

export default function NgoPortal({
  currentUser,
  onNotify,
  onLogout,
  onGoHome,
  initialTab = 'dashboard'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Entities & Data State
  const [profile, setProfile] = useState(initialNgoProfile);
  const [metrics, setMetrics] = useState(ngoMetrics);
  const [activities, setActivities] = useState(recentActivities);
  const [events, setEvents] = useState(upcomingEvents);
  const [communities, setCommunities] = useState(allCommunities);
  const [opportunities, setOpportunities] = useState(allOpportunities);

  // Modal States
  const [createOppModalOpen, setCreateOppModalOpen] = useState(false);
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);
  const [selectedCommunityForPartnership, setSelectedCommunityForPartnership] = useState(null);
  const [viewCommunityModalOpen, setViewCommunityModalOpen] = useState(false);
  const [selectedCommunityForView, setSelectedCommunityForView] = useState(null);
  const [scheduleTrainingOpen, setScheduleTrainingOpen] = useState(false);

  // Update NGO Profile
  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Handle Create Opportunity
  const handleCreateOpportunity = (newOpportunity) => {
    setOpportunities((prev) => [newOpportunity, ...prev]);
    // update metric
    setMetrics((prev) => ({
      ...prev,
      totalActivity: {
        ...prev.totalActivity,
        value: prev.totalActivity.value + 1
      }
    }));
  };

  // Handle Request Partnership
  const handleOpenPartnershipModal = (community) => {
    setSelectedCommunityForPartnership(community);
    setPartnershipModalOpen(true);
  };

  const handleSubmitPartnershipRequest = (req) => {
    // Update community status to discussion
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === req.communityId
          ? {
              ...c,
              partnershipStatus: 'Partnership in discussion',
              statusType: 'discussion'
            }
          : c
      )
    );

    // Add activity
    const newAct = {
      id: `act-${Date.now()}`,
      initials: req.communityName.slice(0, 2).toUpperCase(),
      avatarBg: 'bg-orange-100 text-orange-800',
      title: `Sent partnership request to ${req.communityName}`,
      sector: req.partnershipType,
      time: 'Just now',
      type: 'request',
      unread: false
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Handle View Community
  const handleViewCommunity = (community) => {
    setSelectedCommunityForView(community);
    setViewCommunityModalOpen(true);
  };

  return (
    <NgoLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      ngoProfile={profile}
      currentUser={currentUser}
      onLogout={onLogout}
      onGoHome={onGoHome}
    >
      {/* 1. DASHBOARD VIEW (IMAGE 1) */}
      {activeTab === 'dashboard' && (
        <NgoDashboard
          ngoProfile={profile}
          metrics={metrics}
          activities={activities}
          events={events}
          communities={communities}
          opportunities={opportunities}
          onNavigateTab={setActiveTab}
          onOpenCreateOpportunity={() => setCreateOppModalOpen(true)}
          onOpenScheduleTraining={() => setActiveTab('training')}
          onViewCommunity={handleViewCommunity}
          onRequestPartnership={handleOpenPartnershipModal}
          onNotify={onNotify}
        />
      )}

      {/* 2. ORGANIZATION PROFILE VIEW (IMAGE 2) */}
      {activeTab === 'profile' && (
        <NgoProfile
          ngoProfile={profile}
          onUpdateProfile={handleUpdateProfile}
          onNotify={onNotify}
        />
      )}

      {/* 3. DISCOVER COMMUNITIES VIEW (IMAGE 3 & IMAGE 4) */}
      {activeTab === 'communities' && (
        <NgoCommunities
          communities={communities}
          onViewCommunity={handleViewCommunity}
          onRequestPartnership={handleOpenPartnershipModal}
          onNotify={onNotify}
        />
      )}

      {/* 4. OPPORTUNITIES VIEW (IMAGE 5) */}
      {activeTab === 'opportunities' && (
        <NgoOpportunities
          opportunities={opportunities}
          onOpenCreateModal={() => setCreateOppModalOpen(true)}
          onNotify={onNotify}
        />
      )}

      {/* 5. TRAINING & EVENTS VIEW */}
      {activeTab === 'training' && (
        <NgoTrainingEvents
          events={events}
          onOpenScheduleModal={() => {
            onNotify('info', 'Schedule modal opened. Select collective and curriculum.');
          }}
          onNotify={onNotify}
        />
      )}

      {/* 6. REPORTS VIEW */}
      {activeTab === 'reports' && (
        <NgoReports onNotify={onNotify} />
      )}

      {/* 7. MESSAGES VIEW */}
      {activeTab === 'messages' && (
        <NgoMessages onNotify={onNotify} />
      )}

      {/* ========================================================= */}
      {/* MODALS */}
      {/* ========================================================= */}
      <CreateOpportunityModal
        isOpen={createOppModalOpen}
        onClose={() => setCreateOppModalOpen(false)}
        onCreate={handleCreateOpportunity}
        onNotify={onNotify}
      />

      <RequestPartnershipModal
        isOpen={partnershipModalOpen}
        community={selectedCommunityForPartnership}
        onClose={() => {
          setPartnershipModalOpen(false);
          setSelectedCommunityForPartnership(null);
        }}
        onSubmitRequest={handleSubmitPartnershipRequest}
        onNotify={onNotify}
      />

      <ViewCommunityModal
        isOpen={viewCommunityModalOpen}
        community={selectedCommunityForView}
        onClose={() => {
          setViewCommunityModalOpen(false);
          setSelectedCommunityForView(null);
        }}
        onRequestPartnership={handleOpenPartnershipModal}
      />

    </NgoLayout>
  );
}
