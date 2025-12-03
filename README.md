# veriflow - Sistema profesional de gestión QA

Un sistema integral de gestión de proyectos diseñado específicamente para equipos de aseguramiento de la calidad, construido con React, Next.js 16, TypeScript y Tailwind CSS.

## Features

### 1. Authentication & User Management
- Simple login without initial roles
- Unique user codes for project invitations
- Role assignment occurs at the project level (ORGANIZADOR, EJECUTOR, QA)

### 2. Projects Management
- Create and manage multiple QA projects
- Project settings and configuration
- Team member management with role assignment
- Add members using unique user codes
- Progress tracking per project

### 3. Task Management Workspace
- **Kanban Board**: Visual task workflow through 7 states
  - Backlog
  - Assigned
  - In Progress
  - Pending QA
  - In Review
  - Needs Correction
  - Completed
- Task priority levels (Low, Medium, High, Critical)
- Task list view
- Calendar integration

### 4. Quality Assurance Workflow
- **Executor Delivery**: Submit work with summary and technical details
- **QA Review**: Approve or reject with feedback
- **Correction Handling**: Clear feedback for needed changes
- Delivery history and timeline

### 5. File Management
- Attach files to tasks (Request and Delivery Evidence contexts)
- File repository view
- Upload and download capabilities

### 6. Theme System
- Configurable primary colors
- Options: Neutral, Corporate Blue, Forest Green, Violet
- Semantic colors for status (Red: Error, Green: Success, Amber: Warning)
- Dark mode support

### 7. Role-Based Views
- **Organizador**: Create projects, assign tasks, manage team
- **Ejecutor**: Complete assigned tasks and submit work
- **QA**: Review deliverables and approve/reject work

## Project Structure

\`\`\`
app/
├── layout.tsx                    # Root layout with theme provider
├── page.tsx                      # Login page
├── dashboard/                    # Dashboard view
├── projects/                     # Projects management
├── workspace/                    # Task workspace
├── settings/                     # Settings and preferences
└── calendar/                     # Calendar view

components/
├── layout/
│   ├── app-shell.tsx            # Main app container
│   ├── sidebar.tsx              # Left navigation
│   ├── navbar.tsx               # Top bar with role switcher
│   └── role-indicator.tsx       # Current role display
├── pages/
│   ├── login-page.tsx
│   ├── dashboard-content.tsx
│   ├── projects-content.tsx
│   ├── workspace-content.tsx
│   ├── settings-content.tsx
│   └── calendar-content.tsx
├── workspace/
│   ├── kanban-board.tsx         # Kanban view
│   ├── task-card.tsx            # Task card component
│   ├── task-list-view.tsx       # List view
│   ├── files-view.tsx           # Files repository
│   └── members-view.tsx         # Team members
├── dialogs/
│   ├── create-project-dialog.tsx
│   ├── project-settings-dialog.tsx
│   ├── create-task-dialog.tsx
│   ├── task-detail-panel.tsx    # Task detail with QA flow
│   ├── task-detail-left.tsx     # Task info & timeline
│   └── task-detail-right.tsx    # Task metadata
└── providers/
    └── theme-provider.tsx       # Theme system

globals.css                       # Design tokens and theme configuration
\`\`\`

## Database Alignment

The system follows the exact database schema provided:
- `usuarios`: User accounts
- `proyectos`: Projects
- `miembros_proyecto`: Team members with roles per project
- `tareas`: Tasks with solicitante, ejecutor, qa_id
- `entregas_tarea`: Delivery submissions with version tracking
- `revisiones_qa`: QA reviews with verdicts
- `adjuntos`: File attachments with context

## Design System

### Color Tokens
- **Primary**: Configurable (default: neutral)
- **Semantic Colors**: Fixed for status indication
- **Priority Badges**: Low (Gray), Medium (Blue), High (Orange), Critical (Red)
- **Task Status**: 7 distinct colors for clear workflow visibility

### Typography
- Font: Geist (sans-serif)
- Hierarchy: Clear heading-to-body relationships
- Line heights optimized for readability

### Layout
- Flexbox-first approach
- Sidebar + Main content layout
- Responsive grid systems
- Minimum 80% sheet width for detail panels

## Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in browser**:
   Navigate to `http://localhost:3000`

4. **Inicio de Demo**:
   - Correo: demo@veriflow.com
   - Contraseña: demo123

## Key Workflows

### Creating a Project
1. Navigate to Projects
2. Click "New Project"
3. Add project name and description
4. Add team members using their user codes
5. Assign roles to each member
6. Confirm creation

### Creating and Assigning Tasks
1. Enter workspace
2. Click "New Task"
3. Fill task details (no executor assignment yet)
4. Save task (goes to Backlog)
5. Organizador reviews unassigned tasks
6. Assign to Executor via task detail

### Completing Quality Workflow
1. **Executor**: Task assigned → completes work → submits delivery
2. **QA**: Receives delivery → reviews → approves or rejects
3. **Executor** (if rejected): Makes corrections → resubmits
4. **System**: Task moves to Completed when approved

## Technology Stack

- **Frontend Framework**: React 19.2 with Next.js 16
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context
- **Theme System**: CSS Variables with data attributes

## Architecture Highlights

- **Theme Provider**: Global theme context with localStorage persistence
- **Role Indicator**: Dynamic role switching for testing different perspectives
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: ARIA labels and semantic HTML throughout
- **Performance**: Optimized re-renders with proper memoization

---

Built with ♥ for QA Teams
</parameter>
