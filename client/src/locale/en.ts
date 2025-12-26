import type { LocaleDict } from "@/lib/internalization/i18n.schema";
import { CREDENTIAL_LIMITS, EVENT_LIMITS, TASK_LIMITS, TASK_RECORD_LIMITS, USER_LIMITS } from "@shared/limits";

const { username, nickname } = USER_LIMITS;
const { password } = CREDENTIAL_LIMITS;
const { description, keyword, keywords } = TASK_LIMITS;
const { note } = TASK_RECORD_LIMITS;
const { title, description: eventDescription } = EVENT_LIMITS;

export const en = {
  // Task
  "task.create.success": "Task created successfully!",
  "task.create.loading": "Creating task...",
  "task.update.success": "Task updated successfully!",
  "task.update.loading": "Updating task...",
  "task.delete.success": "Task deleted successfully!",
  "task.delete.loading": "Deleting task...",
  "task.revert.success": "Task reverted successfully!",
  "task.revert.loading": "Reverting task...",
  "task_list.title": "Your task list",
  "task_list.subtitle": "Track your tasks, view changelogs, and other stuff!",
  "task_list.empty.title": "No tasks yet.",
  "task_list.empty.subtitle": "Start tracking your tasks by creating one.",
  "task_list.action.create": "Create new task",
  "task_form.describe": "Describe the task",
  "task_form.title": "New task",
  "task_form.subtitle": "You can change these later",
  "task.timeframe.start": "When did the task start?",
  "task.timeframe.end": "When will the task end?",
  "task_list.no_tasks_found": "No tasks found",
  "task.error.description_exceeded_length_limit": `Description must be between ${description.min}-${description.max} characters.`,
  "task.error.keywords_exceeded_length_limit": `You can only add ${keywords.min}-${keywords.max} keywords`,
  "task.error.task_not_found": "Task not found",
  "task.error.no_changes_found": "No changes found",
  "task.error.due_must_be_ahead": "Due must be ahead of task's starting date.",

  // Task record
  "task_record.error.note_exceeded_length_limit": `Note must be between ${note.min}-${note.max} characters.`,
  "task_record.error.task_record_not_found": "Task record not found",

  // Event
  "event.create.success": "Event created successfully!",
  "event.create.loading": "Creating event...",
  "event.update.success": "Event updated successfully!",
  "event.update.loading": "Updating event...",
  "event.delete.success": "Event deleted successfully!",
  "event.delete.loading": "Deleting event...",
  "event.action.create": "Create new event",
  "event.title": "Event Calendar",
  "event.subtitle": "Events presented in a calendar",
  "event.error.title_exceeded_length_limit": `Title must be between ${title.min}-${title.max}`,
  "event.error.description_exceeded_length_limit": `Description must be between ${eventDescription.min}-${eventDescription.max} characters`,

  // Auth
  "auth.signin.success": "Signed in successfully!",
  "auth.signin.loading": "Signing you in...",
  "auth.signup.success": "Signed up successfully!",
  "auth.signup.loading": "Signing you up...",
  "auth.signout.success": "Signed out successfully!",
  "auth.signout.loading": "Signing you out...",
  "auth.signout.action": "Sign out",
  "auth.error.username_already_taken": "Username is already taken",
  "auth.error.invalid_credentials": "Invalid credentials",
  "auth.error.user_not_found": "User not found",
  "auth.error.credentials_not_found": "Credentials not found",
  "auth.error.session_not_found": "Session not found",
  'auth.error.update_username_on_cooldown': 'You can change your username again in {{days}}d, {{hours}}hr, and {{minutes}}',
  "auth.error.token_not_found": "Token not found",
  "auth.error.expired_token": "Token has expired",
  "auth.error.invalid_token": "Invalid token",

  // User
  "user.error.username_exceeded_length_limit": `Username must be between ${username.min}-${username.max}`,
  "user.error.username_invalid_characters": "Username contains invalid characters",
  "user.error.nickname_exceeded_length_limit": `Nickname must be ${USER_LIMITS.nickname.min}-${USER_LIMITS.nickname.max} characters.`,
  "user.error.nickname_invalid_characters": "Nickname contains invalid characters",
  "user.error.invalid_characters": "Invalid characters used",

  // Credentials
  "credential.error.password_exceeded_length_limit": `Password must be between ${password.min}-${password.max}`,
  "credential.error.password_invalid_characters": "Password contains invalid characters",

  // Preferences
  "preferences.title": "Preferences",
  "preferences.action.change_language": "Change Language",

  // Sidebar
  "sidebar.planners.title": "Planners",
  "sidebar.planners.todo_list": "To Do List",
  "sidebar.planners.event_calendar": "Event Calendar",
  "sidebar.you.title": "You",
  "sidebar.you.account": "Account",
  "sidebar.you.preferences": "Preferences",
  "sidebar.other.getting_started": "Getting Started",

  // Account / Task details
  "account_manager.title": "Manage your account",
  "task_details.title": "Task Details",

  // App
  "app.title": "Welcome to taskitten!",

  // Status
  "status.pending": "Pending",
  "status.in_progress": "In Progress",
  "status.completed": "Completed",
  "status.cancelled": "Cancelled",

  // Priority
  "priority.low": "Low Priority",
  "priority.moderate": "Moderate Priority",
  "priority.high": "High Priority",
  "priority": "Priority",
  "status": "Status",

  // General / internal errors
  "error.internal": "Internal server error",
  "error.forbidden": "Forbidden",

  // netwoek
  "network.error.offline": "You are currently offline. Please check your internet connection.",
} as const satisfies LocaleDict;
