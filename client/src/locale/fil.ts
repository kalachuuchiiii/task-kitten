import type { LocaleDict } from "@/lib/internalization/i18n.schema";

export const fil = {
  "task.create.success": "Matagumpay na nalikha ang gawain!",
  "task.create.loading": "Gumagawa ng gawain...",

  "task.update.success": "Matagumpay na na-update ang gawain!",
  "task.update.loading": "Ina-update ang gawain...",

  "task.delete.success": "Matagumpay na natanggal ang gawain!",
  "task.delete.loading": "Tinatanggal ang gawain...",

  "task.revert.success": "Matagumpay na naibalik ang gawain!",
  "task.revert.loading": "Ibinabalik ang gawain...",

  "event.create.success": "Matagumpay na nalikha ang kaganapan!",
  "event.create.loading": "Gumagawa ng kaganapan...",

  "event.update.success": "Matagumpay na na-update ang kaganapan!",
  "event.update.loading": "Ina-update ang kaganapan...",

  "event.delete.success": "Matagumpay na natanggal ang kaganapan!",
  "event.delete.loading": "Tinatanggal ang kaganapan...",

  "auth.signin.success": "Matagumpay na nakapasok!",
  "auth.signin.loading": "Pinapapasok ka...",

  "auth.signup.success": "Matagumpay na nakapagrehistro!",
  "auth.signup.loading": "Ipinaparehistro ka...",

  "auth.signout.success": "Matagumpay na nakalabas!",
  "auth.signout.loading": "Pinapalabas ka...",

  "taskList.title": "Iyong listahan ng gawain",
  "taskList.subtitle": "Subaybayan ang iyong mga gawain, tingnan ang mga pagbabago, at iba pang bagay!",
  "taskList.empty.title": "Wala pang gawain.",
  "taskList.empty.subtitle": "Simulan ang pagsubaybay sa iyong mga gawain sa pamamagitan ng paglikha ng isa.",
  "taskList.action.create": "Lumikha ng bagong gawain",
  "preferences.title": "Mga Kagustuhan",
  "preferences.action.changeLanguage": 'Ibahin ang lenggwahe',
  "auth.signout.action": 'Mag sign-out',
  "event.action.create": 'Gumawa ng panibagong kaganapan',
  "event.title": "Kalendaryo ng mga kaganapan",
  
  "event.subtitle": 'Mga kaganapang ipinepresenta ng kalendaryo',
  "sidebar.planners.title": "Mga Taga-Plano",
  "sidebar.you.title": 'Ikaw',
  "sidebar.planners.todoList": "Listahan ng Gawain",
  "sidebar.planners.eventCalendar": "Kalendaryo ng Kaganapan",

  "sidebar.you.account": "Account",
  "sidebar.you.preferences": "Mga Kagustuhan",

  "sidebar.other.gettingStarted": "Pagsisimula",
  "accountManager.title": "I-manage ang iyong account",
  "taskDetails.title": "Mga detalye ng gawain",
  "app.title": "Maligayang pagdating sa Taskitten!",
  "taskForm.describe": "Ipaliwanag ang gawain",
  "status.cancelled": "Na-kansela",
  "status.pending": "Naka-antala",
  "status.completed": "Natapos na",
  "status.in_progress": "Kasalukuyang ginagawa",
  "priority.low": "Mababang Prayoridad",
"priority.moderate": "Katamtamang Prayoridad",
"priority.high": "Mataas na Prayoridad",
"priority": "Prayoridad",
 "status": "Kalagayan",
 'task.timeframe.start': "Kailan nagsimula ang gawain?",
  'task.timeframe.end': "Kailan magtatapos ang gawain?",
  "taskForm.subtitle": "Pwede mo pa itong baguhin mamaya",
  "taskForm.title": "Panibagong gawain",
"taskList.noTasksFound": "Walang nahanap na gawain"
  
} as const satisfies LocaleDict
