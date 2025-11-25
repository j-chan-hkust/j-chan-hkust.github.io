---
title: Configuring Emacs Org Mode to Work Better with iCloud Sync
description: How to stop losing your todos when using icloud sync with org mode by turning on autosave and autoload
pubDate: Aug 29 2025
tags:
---
The end is nigh. I have started fiddling around with org mode. Pray for me.

In all seriousness – I feel like I've unintentionally followed the natural lifecycle of every productivity nerd – going from todoist to notion to paper notes to obsidian to notion to paper notes then back to obsidian and now, finally I am standing at the gates of org mode.

-----

For me the most sacred part of any productivity system is "capture anywhere". No matter where I am, I need to be able to capture whatever snippet or idea I just had into a note somewhere. Previously I got this done using an apple shortcut[^3] routing an API call to notion - collecting each thought as an individual ticket.

On the surface this looked even easier to implement in org mode – instead of an API call, all you have to do is append a line to a file, and bam your note is saved locally, soon to be synced to iCloud[^1]. However, I soon realized I was losing notes and getting version conflict errors in icloud, mainly due to the way emacs handles file saves.
![diagram](../../assets/emacs-diagram.png)
The main thing I missed is that all actions in emacs works on buffers – with buffers only being saved to the file when you explicitly tell it to. Hence I was getting all kinds of issues and losing work when my shortcut tried to append to an already open note in emacs – the buffer I was saving wasn't the latest version of my file anymore, and was conflicting with or overwriting additions my shortcut had just made[^5].
### The Fix
In your .emacs.d config launch script, you want to add the following snippet:
``` lisp 
;; === AUTO-SAVE: Constantly save changes to disk ===
;; Auto-save visited files every 10 seconds of idle time
(auto-save-visited-mode 10)
(setq auto-save-visited-interval 10)  ; Very frequent saves for iCloud sync

;; (optional) Also save all org buffers after agenda operations
(defun my/save-all-org-buffers (&rest _)
  "Save all org-mode buffers without prompting."
  (save-some-buffers t (lambda () (derived-mode-p 'org-mode))))

(add-hook 'org-agenda-after-show-hook #'my/save-all-org-buffers)
(advice-add 'org-agenda-todo :after #'my/save-all-org-buffers)
(advice-add 'org-agenda-priority :after #'my/save-all-org-buffers)
(advice-add 'org-agenda-set-tags :after #'my/save-all-org-buffers)
(advice-add 'org-agenda-schedule :after #'my/save-all-org-buffers)
(advice-add 'org-agenda-deadline :after #'my/save-all-org-buffers)
(advice-add 'org-agenda-refile :after #'my/save-all-org-buffers)

;; === AUTO-REVERT: Reload files when they change on disk ===
;; Enable global auto-revert for all buffers
(global-auto-revert-mode 5)

;; Make auto-revert very responsive for org files
(setq auto-revert-interval 5)  ; Check every 5 second
(setq auto-revert-check-vc-info nil)  ; Skip VC checks (aka git) for performance

;; Also revert non-file buffers like dired
(setq global-auto-revert-non-file-buffers t)
```

The main change you want to be making is getting emacs to be automatically saving buffers as it edits them, and to also be reverting[^2] files in buffers as they get updated by other parallel workflows, so you're always using the latest version of the file[^4]. Optionally - you can also add hooks to save buffers after each agenda action, but this isn't necessary to get the main benefits of the fix.[^6]


[^1]: It actually works even better than Notion API, because offline notes on a plane will eventually get synced properly when I touch down.
[^2]: Reloading
[^3]: Which I almost always have access to some combination of my phone, my laptop, or my apple watch
[^4]: I've made some assumptions that saving/reloading files every 5-10 seconds is more than good enough for my use-case, but obviously we can set them up to poll more frequently 
[^5]: Now obviously this could have also been fixed if I just saved more frequently, but I really don't need to add another subroutine of "did I save emacs buffers" to my mental loop
[^6]: There are also some tradeoffs for implementing things this way - auto-reverting while you're editing something does some funky things with the buffer you're already working with - but I'm hoping most of my usage patterns won't create this issue