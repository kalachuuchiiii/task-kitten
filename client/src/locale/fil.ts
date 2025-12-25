import type { LocaleDict } from "@/lib/internalization/i18n.schema";
import {
  CREDENTIAL_LIMITS,
  EVENT_LIMITS,
  TASK_LIMITS,
  TASK_RECORD_LIMITS,
  USER_LIMITS,
} from "@shared/limits";

const { username, nickname } = USER_LIMITS;
const { password } = CREDENTIAL_LIMITS;
const { description, keyword, keywords } = TASK_LIMITS;
const { note } = TASK_RECORD_LIMITS;
const { title, description: eventDescription } = EVENT_LIMITS;

export const fil = {
  // Task
  "task.create.success": "Matagumpay na nagawa ang task!",
  "task.create.loading": "Ginagawa ang task...",
  "task.update.success": "Matagumpay na na-update ang task!",
  "task.update.loading": "Ina-update ang task...",
  "task.delete.success": "Matagumpay na nabura ang task!",
  "task.delete.loading": "Binubura ang task...",
  "task.revert.success": "Naibalik ang task!",
  "task.revert.loading": "Ibinabalik ang task...",
  "task_list.title": "Iyong listahan ng mga task",
  "task_list.subtitle": "Subaybayan ang iyong mga task, tingnan ang changelogs, at iba pa!",
  "task_list.empty.title": "Wala pang task.",
  "task_list.empty.subtitle": "Simulan ang pag-track ng mga task sa pamamagitan ng paggawa ng isa.",
  "task_list.action.create": "Gumawa ng bagong task",
  "task_form.describe": "Ilarawan ang task",
  "task_form.title": "Bagong task",
  "task_form.subtitle": "Maaari mo itong baguhin mamaya",
  "task.timeframe.start": "Kailan nagsimula ang task?",
  "task.timeframe.end": "Kailan matatapos ang task?",
  "task_list.no_tasks_found": "Walang nahanap na task",
  "task.error.description_exceeded_length_limit": `Ang deskripsyon ay dapat nasa pagitan ng ${description.min}-${description.max} na mga karakter.`,
  "task.error.keywords_exceeded_length_limit": `Maaari ka lang maglagay ng ${keywords.min}-${keywords.max} na keywords`,
  "task.error.task_not_found": "Hindi nahanap ang task",
  "task.error.no_changes_found": "Walang nahanap na pagbabago",
  "task.error.due_must_be_ahead": "Ang due date ay dapat mas huli kaysa sa petsa ng pagsisimula.",

  // Task record
  "task_record.error.note_exceeded_length_limit": `Ang note ay dapat nasa pagitan ng ${note.min}-${note.max} na mga karakter.`,
  "task_record.error.task_record_not_found": "Hindi nahanap ang task record",

  // Event
  "event.create.success": "Matagumpay na nagawa ang event!",
  "event.create.loading": "Ginagawa ang event...",
  "event.update.success": "Matagumpay na na-update ang event!",
  "event.update.loading": "Ina-update ang event...",
  "event.delete.success": "Matagumpay na nabura ang event!",
  "event.delete.loading": "Binubura ang event...",
  "event.action.create": "Gumawa ng bagong event",
  "event.title": "Kalendaryo ng mga Event",
  "event.subtitle": "Mga event na ipinapakita sa kalendaryo",
  "event.error.title_exceeded_length_limit": `Ang pamagat ay dapat nasa pagitan ng ${title.min}-${title.max}`,
  "event.error.description_exceeded_length_limit": `Ang deskripsyon ay dapat nasa pagitan ng ${eventDescription.min}-${eventDescription.max} na mga karakter`,

  // Auth
  "auth.signin.success": "Matagumpay na nakapag-sign in!",
  "auth.signin.loading": "Ini-sign in ka...",
  "auth.signup.success": "Matagumpay na nakapag-sign up!",
  "auth.signup.loading": "Ini-sign up ka...",
  "auth.signout.success": "Matagumpay na nakapag-sign out!",
  "auth.signout.loading": "Ini-sign out ka...",
  "auth.signout.action": "Mag-sign out",
  "auth.error.username_already_taken": "Ginagamit na ang username",
  "auth.error.invalid_credentials": "Maling credentials",
  "auth.error.user_not_found": "Hindi nahanap ang user",
  "auth.error.credentials_not_found": "Hindi nahanap ang credentials",
  "auth.error.session_not_found": "Hindi nahanap ang session",
  "auth.error.token_not_found": "Hindi nahanap ang token",
  "auth.error.expired_token": "Nag-expire na ang token",
  "auth.error.invalid_token": "Hindi valid ang token",
  "auth.error.update_username_on_cooldown": "Maaari mo ulit baguhin ang iyong username sa loob ng {{days}}d, {{hours}}hr, at {{minutes}}.",

  // User
  "user.error.username_exceeded_length_limit": `Ang username ay dapat nasa pagitan ng ${username.min}-${username.max}`,
  "user.error.username_invalid_characters": "May hindi pinapayagang karakter ang username",
  "user.error.nickname_exceeded_length_limit": `Ang nickname ay dapat nasa ${USER_LIMITS.nickname.min}-${USER_LIMITS.nickname.max} na mga karakter.`,
  "user.error.nickname_invalid_characters": "May hindi pinapayagang karakter ang nickname",
  "user.error.invalid_characters": "May ginamit na hindi pinapayagang mga karakter",

  // Credentials
  "credential.error.password_exceeded_length_limit": `Ang password ay dapat nasa pagitan ng ${password.min}-${password.max}`,
  "credential.error.password_invalid_characters": "May hindi pinapayagang karakter ang password",

  // Preferences
  "preferences.title": "Mga Preference",
  "preferences.action.change_language": "Palitan ang Wika",

  // Sidebar
  "sidebar.planners.title": "Mga Planner",
  "sidebar.planners.todo_list": "To Do List",
  "sidebar.planners.event_calendar": "Kalendaryo ng Event",
  "sidebar.you.title": "Ikaw",
  "sidebar.you.account": "Account",
  "sidebar.you.preferences": "Mga Preference",
  "sidebar.other.getting_started": "Pagsisimula",

  // Account / Task details
  "account_manager.title": "Pamahalaan ang iyong account",
  "task_details.title": "Detalye ng Task",

  // App
  "app.title": "Maligayang pagdating sa taskitten!",

  // Status
  "status.pending": "Naka-pending",
  "status.in_progress": "Isinasagawa",
  "status.completed": "Tapos na",
  "status.cancelled": "Kinansela",

  // Priority
  "priority.low": "Mababang Prayoridad",
  "priority.moderate": "Katamtamang Prayoridad",
  "priority.high": "Mataas na Prayoridad",
  "priority": "Prayoridad",
  "status": "Status",

  // General / internal errors
  "error.internal": "Internal server error",
  "error.forbidden": "Forbidden",
} as const satisfies LocaleDict;
