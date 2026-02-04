# 📔 Journal & Habit Tracker App

**Bring journaling and habit tracking on the go**

A cross-platform mobile application built with **React Native and Expo** that helps users maintain daily journaling and habit-tracking routines without the need for physical notebooks or extra materials.

---

## 📌 Project Information

- **Student:** Katellyn Hyker  
- **Course:** COP3655  
- **Semester:** Winter Semester A  
- **Framework:** React Native (Expo)

---

## 🧠 Project Overview

### Problem Statement
Daily journaling and habit tracking can be inconvenient when it requires carrying physical materials. This app provides a mobile-first solution that allows users to journal and track habits anytime, anywhere.

### Target Audience
Individuals who journal daily or want to build consistent habits using a digital, all-in-one solution.

### Core Value Proposition
This app combines journaling and habit tracking into a single, easy-to-use mobile experience, helping users stay consistent with their routines while on the go.

---

## 🏗️ High-Level Architecture

### Tech Stack

- **Framework:** React Native with Expo  
- **Navigation:** React Navigation  
- **State Management:** React Context  
- **Backend / Storage:** Firebase   
- **External APIs:** TBD  
- **Key Libraries:** react-navigation/* (More planned)

---

## 🧭 Screens & Navigation Flow

### Main Screens
1. **Home Screen** – Overview and summary of user activity  
2. **Journal** – Displays all journal entries  
3. **New Entry** – Create a new journal entry  
4. **Habit Tracker** – Create and manage custom habits  

Navigation is implemented using a combination of stack and tab navigation.
---

## 🗂️ Data Model (Planned) **(WIP)**

- **JournalEntry**
  - id
  - title
  - content
  - date (not fully implemented)
  - mood (optional)
  - category (optional)

- **Habit**
  - id
  - name
  - frequency
  - completion status (not implemented)

---

## ⭐ Core Features

### MVP (Must-Have)
- Display journal entries
- Create, edit, and delete entries
- Habit tracking system

### Stretch Features (Nice-to-Have)
- Log in system
- Image attachments in journal entries
- Calendar view
- Mood tracking
- Categories & tags
- Custom themes
- Customizable journal entries

---

## 📅 Weekly Progress Tracker

### Phase 1: Foundation (Classes 1–2)

**Focus:** Project setup, navigation, and UI scaffolding

#### Class 1 (1/15/26 – 1/19/26)
**Status:** ✅ Complete  
**Goals Achieved:**
- Initialized Expo project
- Set up project structure
- Configured navigation
- Created placeholder screens
- Created Git repository

**Notes:**  
Migrated content from original coding assignment to preserve progress.

#### Class 2 (1/21/26 - 1/25/26)
**Status:** ✅ Complete  
**Goals:**
- Build reusable UI components
- Apply app theme (colors, typography)
- Create static versions of 2–3 main screens
- Test navigation flow

---

### Phase 2: Core Development (Classes 3–4)

**Focus:** Core features and data management

#### Class 3 (1/26/26 - 1/28/26)
**Status:** ✅ Complete   
- State management setup  
- Data storage implementation  
- First core feature integration  

#### Class 4
**Status:** 🚧 In Progress  
- Second core feature  
- CRUD operations  
- Input validation & persistence  

---

### Phase 3: Polish & Testing (Classes 5–6)

**Focus:** UX refinement and testing

- UI/UX improvements
- Animations & transitions
- Error handling
- Performance optimization
- Accessibility enhancements

---

### Phase 4: Presentation & Submission (Class 7)

**Focus:** Final delivery

- Live demo
- Architecture walkthrough
- App Store assets
- EAS production builds
- Optional App Store / Play Store submission

---

## 🎤 Presentation Requirements

- Live demo (5–7 minutes)
- Problem & solution overview
- Technical architecture walkthrough
- Challenges & lessons learned
- Q&A (2–3 minutes)

---

## 🚀 App Store Submission Guide

### Pre-Submission Checklist
- App fully functional
- App icon (1024×1024)
- Splash screen implemented
- App name finalized
- Privacy policy created
- Screenshots prepared

---

### Apple App Store
- Apple Developer Account ($99/year)
- macOS + Xcode
- EAS Build & Submit

```bash
eas build --platform ios
eas submit --platform ios
