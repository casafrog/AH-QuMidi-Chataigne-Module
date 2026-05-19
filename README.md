Chataigne Module for Special MIDI Module for Allen&Heath Qu Series Audio Mixers v1.0.0 - T.Hyde c2026 www.casafrog.com
=======================================================================================================================
This file is a Chataigne Custom Module to control an Allen&Heath Qu-series mixer via its native USB-Midi capability.
This console (at time of writing) has two basic operative modes, a native "Qu-Midi" mode and HUI/Mackie-compatible mode.
The "Qu-Midi" mode is useful for scene selection and muting, wherein the HUI mode is more useful for DAW - and the two modes
do *NOT* have much in the way of overlapping capability, so it is important to choose your mode carefully. This module does *not*
support the HUI/Mackie (DAW control) mode and is intended for live show control operation, where the faders are still under your control 
and the mix is still live (versus an offline recording session where the console is just a control surface for a DAW).

Since the USB-Midi is "CoreAudio" (Mac) compliant and regular MIDI class-compliant on Windows/Linux, you do *not* need any additional
drivers, nor do you need the A&H Midi Controller Software package installed (despite what a particular website recommends). 
This is really plug and play.

The basic premise is to load the module, and in the module inspector set your MIDI OUT interface. It will likely be called "QuXX MIDI In"
as the name reference is relative to the console, not the control PC. There is no need to set the module's "Midi Input" interface as there 
is no feedback from the console.

Second is to ensure that the MIDI channel for outbound is correct. The console defaults to channel 1, as does the module so this should be
fine if you haven't changed those defaults. (DAW is default Midi Channel 2, so you might want to be sure to avoid that specifically).

Then create a Trigger layer in your sequence (or however you wish to trigger the module), drop in a trigger and add a new consequence,
setting the consequence to be the AH-QuMidi module, then a selection of potential actions such as:

   single channel mute (set channel in numeric parameter)
   single channel unmute (set channel in numeric parameter),

if you wish to target a specific single channel, noting that these really ar the CHANNELS not the FADER STRIPS

or groups of targets, which have many checkboxes so you can do more than one at a time in the same trigger.
Note that a check in the box is MUTE ENABLED, not channel enabled, so the checkbox mimics the RED LIGHT on your console:

   MuteGroups mute/unmute - all 4 MG's
   Stereo Pair mute/unmute - all 3 ST's
   FX Mute/unmute - all 4 FX Returns (fxr) and all 4 FX Sends (fxs)
   Mix1Master - one click, all quiet. Kind of. (The other Mix masters do not have midi capability in this mode at time of writing).

   and the big one:
   All Detail Mute Control - which encompasses all the available mutes noted above. Ultimate Cosmic Power.

Basic mutes and unmites are fine, but to exercise real control, scenes are your better option. Save scenes. Whatever you have on the active layer 
of your console (let's face it you should be using the Custom Layer for your show, so we will assume that, but a scene still saves every state)...

The scene will have a numbered slot that you save it in, regardless of the arbitrary name you give it. Unlike softkey "Next-Recall" or "Prior-Recall"
or having to nav through the scenes menu to find a scene, you can jump scenes arbitrarily in any order at any time. This means you can configure scenes
more as a "stage preset" rather than a "replicated state that happens next". Thus, if you have a group of mics on stage that the scenario is recurrent
(such as two primaries and an ensemble) you can simply recall that scene for each time during the show it occurs rather than having multiple copies of it
(which might eat up your 100 scenes per show limit that the console has quickly...). Moreover if you modify that scene (and save it), then your modification
tracks for each reuse of that scene so your fingers get a break.

Pop in the scene number as a parameter and off it goes, faders flying on their own.

Mix and match scene changes and mutes as you need to accommodate performance variants or recovery situations. Having the automation is the easy part, but it can 
be a hurdle that prevents you from pushing the technology further to make your job easier. With the above, you can now concentrate on having multiple shows to 
automatically handle understudies jsut by changing the input routing (or processing source depending on firmware) and just load the alternate show. Or if a mic 
pack fails and you need to swap to backups, you don't have to keep referencing hand-written notes, just re-assign the new source to the channel. Admittedly, this 
isn't a feature the module solves, but the module solves the automation at a particular time so you can concentrate on the changes or recovery, guving you more 
time to concentrate on fixing the problem, since you can only be navigating one menu at a time......

=========================================================================================
