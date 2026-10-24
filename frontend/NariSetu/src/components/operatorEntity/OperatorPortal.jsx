import React, { useState } from 'react';
import OperatorLayout from './OperatorLayout';
import OperatorDashboard from './OperatorDashboard';
import NewRegistrationForm from './NewRegistrationForm';
import UserRecords from './UserRecords';
import BulkImportDatasets from './BulkImportDatasets';
import FixIssueModal from './FixIssueModal';
import ArtisanIdCardModal from './ArtisanIdCardModal';

import {
  initialOperatorProfile,
  initialOperatorMetrics,
  initialTodayEntries,
  initialMasterRecords,
  initialAttentionItems,
  initialRecentRegistrations,
  initialBatchValidatedRoster,
  initialBatchComposition,
  initialRecentImportHistory,
  schemaMappings
} from './operatorData';

export default function OperatorPortal({
  currentUser,
  onNotify,
  onLogout,
  onGoHome,
  initialTab = 'dashboard'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Main Entity States
  const [profile, setProfile] = useState(() => ({
    ...initialOperatorProfile,
    name: currentUser?.name || initialOperatorProfile.name,
    id: currentUser?.id || initialOperatorProfile.id
  }));

  const [metrics, setMetrics] = useState(initialOperatorMetrics);
  const [todayEntries, setTodayEntries] = useState(initialTodayEntries);
  const [masterRecords, setMasterRecords] = useState(initialMasterRecords);
  const [attentionItems, setAttentionItems] = useState(initialAttentionItems);
  const [recentRegistrations, setRecentRegistrations] = useState(initialRecentRegistrations);
  const [batchRoster, setBatchRoster] = useState(initialBatchValidatedRoster);

  // Modals
  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectedRecordForCard, setSelectedRecordForCard] = useState(null);

  // 1. Handle New Registration Submission
  const handleRegisterBeneficiary = (newArtisan) => {
    // Add to master records
    setMasterRecords((prev) => [newArtisan, ...prev]);

    // Add to today's entries
    const todayEntry = {
      id: newArtisan.uid,
      name: newArtisan.name,
      bengaliName: newArtisan.bengaliName,
      initials: newArtisan.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      avatarBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      village: newArtisan.village,
      block: newArtisan.block,
      gramPanchayat: newArtisan.gramPanchayat,
      skillCategory: newArtisan.craft,
      skillPillColor: 'bg-orange-50 text-orange-700 border-orange-200',
      time: 'Just now',
      status: 'Verified',
      statusPillColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      actionText: 'View',
      actionType: 'view',
      phone: newArtisan.phone,
      aadhaarRef: newArtisan.aadhaarRef,
      age: newArtisan.age,
      registeredDate: 'Today, Just now'
    };
    setTodayEntries((prev) => [todayEntry, ...prev]);

    // Update recent registrations carousel
    const recentCard = {
      id: newArtisan.uid,
      name: newArtisan.name,
      bengaliName: newArtisan.bengaliName,
      age: newArtisan.age,
      craft: newArtisan.craft,
      location: `${newArtisan.panchayat} • ${newArtisan.block}`,
      timeAgo: 'Just now',
      image: newArtisan.avatar
    };
    setRecentRegistrations((prev) => [recentCard, ...prev]);

    // Update metrics
    setMetrics((prev) => ({
      ...prev,
      verified: prev.verified + 1,
      totalEnrolled: prev.totalEnrolled + 1,
      enrolledToday: prev.enrolledToday + 1
    }));

    onNotify?.('success', `Artisan ${newArtisan.name} (${newArtisan.uid}) enrolled & verified successfully!`);
    setActiveTab('records');
  };

  // 2. Handle Bulk Import of 35 Roster Beneficiaries
  const handleImportBatch = (items) => {
    const importedRecords = items.map((r, index) => {
      const uid = `NS-WB-${7420 + index}`;
      return {
        id: uid,
        uid: uid,
        name: r.fullName,
        bengaliName: null,
        avatar: '/images/women_meeting.jpg',
        craft: r.skillCategory,
        craftDetail: `${r.skillCategory} (5 hrs/day)`,
        panchayat: r.gpVillage,
        habitation: `${r.gpVillage}, Hanskhali`,
        block: 'Hanskhali',
        phone: `+91 ${r.phone}`,
        aadhaarRef: `UID: **** ${Math.floor(1000 + Math.random() * 9000)} (OK)`,
        registered: 'Today, Just now',
        syncStatus: 'Verified',
        syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        age: 32 + (index % 15),
        income: '₹ 8,000 / month',
        education: 'Secondary (10th Pass)',
        maritalStatus: 'Married',
        category: ['Marginalized Artisan']
      };
    });

    setMasterRecords((prev) => [...importedRecords, ...prev]);

    setMetrics((prev) => ({
      ...prev,
      verified: prev.verified + items.length,
      totalEnrolled: prev.totalEnrolled + items.length,
      enrolledToday: prev.enrolledToday + items.length
    }));

    onNotify?.('success', `Successfully ingested batch of ${items.length} verified artisans from offline tablet cache!`);
    setActiveTab('records');
  };

  // 3. Handle Resolution of Attention Item
  const handleOpenFixIssue = (itemOrRow) => {
    let issueToFix = attentionItems.find(a => a.id === itemOrRow.id || a.uid === itemOrRow.id);
    if (!issueToFix) {
      issueToFix = {
        id: 'ATTN-FIX',
        type: itemOrRow.issueType || 'REJECTED DOCUMENT',
        name: itemOrRow.name || 'Artisan',
        uid: itemOrRow.id || 'NS-WB-7404',
        description: itemOrRow.issueDetails || 'Audit mismatch flagged during field inspection.'
      };
    }
    setSelectedIssue(issueToFix);
    setFixModalOpen(true);
  };

  const handleResolveIssue = (issueId, resolutionData) => {
    // Remove from attention items
    setAttentionItems((prev) => prev.filter(i => i.id !== issueId));

    // Update any flagged record in today's entries
    setTodayEntries((prev) =>
      prev.map((row) =>
        row.id === selectedIssue?.uid
          ? {
              ...row,
              status: 'Verified',
              statusPillColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
              actionText: 'View',
              actionType: 'view'
            }
          : row
      )
    );

    // Update master records
    setMasterRecords((prev) =>
      prev.map((rec) =>
        rec.uid === selectedIssue?.uid
          ? {
              ...rec,
              syncStatus: 'Verified',
              syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
              aadhaarRef: `UID: **** 8109 (OK - ${resolutionData.resolvedVal})`
            }
          : rec
      )
    );

    // Update metrics
    setMetrics((prev) => ({
      ...prev,
      rejected: Math.max(0, prev.rejected - 1),
      verified: prev.verified + 1
    }));
  };

  // 4. Handle CSV Template Download
  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Full Name,Mobile No,GP / Gram,Craft Trade,Aadhaar Status,Education Level,Monthly Income\n" +
      "Shanti Soren,9832101234,Hanskhali,Tailoring & Embroidery,Formatted OK,Secondary,7500\n" +
      "Rupa Mondal,9845112345,Bagula,Weaving & Handloom,Formatted OK,Primary,8200\n" +
      "Bela Rani Das,9732023456,Govindapur,Food Processing,Formatted OK,Secondary,6500\n" +
      "Kalyani Ghosh,9641034567,Ramnagar,Jute Handicrafts,Formatted OK,Secondary,7000\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "NariSetu_Operator_Survey_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onNotify?.('success', 'Official NariSetu Artisan Survey CSV Template downloaded!');
  };

  // 5. Handle Export Master CSV
  const handleExportMasterCsv = () => {
    let csvRows = [
      "UID,Full Name,Craft,Gram Panchayat,Habitation,Block,District,Phone,Aadhaar Status,Sync Status,Registered Date"
    ];

    masterRecords.forEach(r => {
      csvRows.push(
        `"${r.uid}","${r.name}","${r.craft}","${r.panchayat || ''}","${r.habitation || ''}","${r.block || 'Hanskhali'}","Nadia","${r.phone}","${r.aadhaarRef || 'OK'}","${r.syncStatus}","${r.registered || ''}"`
      );
    });

    const csvString = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
    const link = document.createElement("a");
    link.setAttribute("href", csvString);
    link.setAttribute("download", `NariSetu_Hanskhali_Master_Artisans_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onNotify?.('success', `Exported ${masterRecords.length} artisan beneficiary master records to CSV.`);
  };

  // 6. View & Print Identity Card
  const handlePrintCard = (record) => {
    setSelectedRecordForCard(record);
    setCardModalOpen(true);
  };

  const handleViewRecord = (record) => {
    handlePrintCard(record);
  };

  return (
    <OperatorLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      operatorProfile={profile}
      currentUser={currentUser}
      onLogout={onLogout}
      onGoHome={onGoHome}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {/* 1. DASHBOARD VIEW (MATCHING IMAGE 1 & IMAGE 2) */}
      {activeTab === 'dashboard' && (
        <OperatorDashboard
          operatorProfile={profile}
          metrics={metrics}
          todayEntries={todayEntries}
          attentionItems={attentionItems}
          onNavigateTab={setActiveTab}
          onOpenNewRegistration={() => setActiveTab('new_registration')}
          onOpenFixIssue={handleOpenFixIssue}
          onViewRecord={handleViewRecord}
          onDownloadTemplate={handleDownloadTemplate}
          onNotify={onNotify}
        />
      )}

      {/* 2. NEW REGISTRATION FORM VIEW (MATCHING IMAGE 3) */}
      {activeTab === 'new_registration' && (
        <NewRegistrationForm
          onCancel={() => setActiveTab('dashboard')}
          onSubmit={handleRegisterBeneficiary}
          onNotify={onNotify}
        />
      )}

      {/* 3. USER RECORDS VIEW (MATCHING IMAGE 4) */}
      {activeTab === 'records' && (
        <UserRecords
          records={masterRecords}
          metrics={metrics}
          recentRegistrations={recentRegistrations}
          onEditRecord={handleViewRecord}
          onPrintCard={handlePrintCard}
          onViewRecord={handleViewRecord}
          onExportCsv={handleExportMasterCsv}
          onNotify={onNotify}
        />
      )}

      {/* 4. BULK CSV & TABLET IMPORT (MATCHING IMAGE 5) */}
      {activeTab === 'import' && (
        <BulkImportDatasets
          rosterItems={batchRoster}
          batchComposition={initialBatchComposition}
          recentHistory={initialRecentImportHistory}
          schemaMappings={schemaMappings}
          onDownloadTemplate={handleDownloadTemplate}
          onImportBatch={handleImportBatch}
          onNotify={onNotify}
        />
      )}

      {/* ========================================================= */}
      {/* MODALS */}
      {/* ========================================================= */}
      <FixIssueModal
        isOpen={fixModalOpen}
        issue={selectedIssue}
        onClose={() => {
          setFixModalOpen(false);
          setSelectedIssue(null);
        }}
        onResolve={handleResolveIssue}
        onNotify={onNotify}
      />

      <ArtisanIdCardModal
        isOpen={cardModalOpen}
        record={selectedRecordForCard}
        onClose={() => {
          setCardModalOpen(false);
          setSelectedRecordForCard(null);
        }}
        onNotify={onNotify}
      />

    </OperatorLayout>
  );
}
