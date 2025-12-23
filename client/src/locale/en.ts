import type { LocaleDict } from "@/lib/internalization/i18n.schema";

export const en = {
  "task.create.success": "Task created successfully!",
  "task.create.loading": "Creating task...",

  "task.update.success": "Task updated successfully!",
  "task.update.loading": "Updating task...",

  "task.delete.success": "Task deleted successfully!",
  "task.delete.loading": "Deleting task...",

  "task.revert.success": "Task reverted successfully!",
  "task.revert.loading": "Reverting task...",

  "event.create.success": "Event created successfully!",
  "event.create.loading": "Creating event...",

  "event.update.success": "Event updated successfully!",
  "event.update.loading": "Updating event...",

  "event.delete.success": "Event deleted successfully!",
  "event.delete.loading": "Deleting event...",

  "auth.signin.success": "Signed in successfully!",
  "auth.signin.loading": "Signing you in...",

  "auth.signup.success": "Signed up successfully!",
  "auth.signup.loading": "Signing you up...",

  "auth.signout.success": "Signed out successfully!",
  "auth.signout.loading": "Signing you out...",

  "taskList.title": "Your task list",
  "taskList.subtitle": "Track your tasks, view changelogs, and other stuff!",
  "taskList.empty.title": "No tasks yet.",
  "taskList.empty.subtitle": "Start tracking your tasks by creating one.",
  "taskList.action.create": "Create new task",

  "preferences.title": "Preferences",
  "preferences.action.changeLanguage": 'Change Language',
  "auth.signout.action": 'Sign out',
  "event.action.create": 'Create new event',
  "event.title": 'Event Calendar',
  "event.subtitle": 'Events presented in a calendar',
  "sidebar.planners.title": "Planners",
  "sidebar.you.title": 'You',
  "sidebar.planners.todoList": "To Do List",
  "sidebar.planners.eventCalendar": "Event Calendar",

  "sidebar.you.account": "Account",
  "sidebar.you.preferences": "Preferences",

  "sidebar.other.gettingStarted": "Getting Started",
  "accountManager.title": "Manage your account",
  "taskDetails.title": "Task Details",
  "app.title": "Welcome to taskitten!",
  "taskForm.describe": "Describe the task",
  "status.cancelled": "Cancelled",
  "status.completed": "Completed",
  "status.pending": "Pending",
  "status.in_progress": "In Progress",
  "priority.low": "Low Priority",
  "priority.moderate": "Moderate Priority",
  "priority.high": "High Priority",
  "priority": "Priority",
  "status": "Status",
  'task.timeframe.start': "When did the task start?",
  'task.timeframe.end': "When will the task end?",
  "taskForm.subtitle": "You can change these later",
  "taskForm.title": "New task",
   'taskList.noTasksFound': "No tasks found"

} as const satisfies LocaleDict
