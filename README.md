Chataigne Module for Allen&Heath Qu Series Audio Mixer Midi Control v1.0.0 - T.Hyde c2026 www.casafrog.com
========================================================================================================
This file is a Chataigne Custom Module to control an Allen&Heath Qu Series Audio Mixer under (USB) Midi Control.
These consoles usually have either a tranditional MIDI in or USB-Midi (Or optionally TCP-MIDI) that some of the
controls or functions may be triggered externally.

A QU-series console is typically configured either as a remote-controlled audio mixer or as a DAW control surface,
but depending on options, configuration or firmware version, not necessarily both at the same time.
This module concetrates on the functions that are fully available in the "Qu-Midi" mode (not the HUI/Mackie modes,
which are for DAW control). Not all functions of the console are available in both modes - in fact there is very little
crossover between the two modes, so choose your modes carefully.

For this module, the most important functions are muting and scene recall. In a live performace setting, most everything
on the console can be controlled using these two concepts. Mutes require a lot of finger presses, so automating those make
sense. Scene recall (via the Scene menu) can take a lot of clicks. You can of course set your softkeys to control next/previous
scene recall (highly recommended) however if you have an active audio mix, even losing one hand from the faders can be cumbersome.
Additionally, there are only 100 scenes (in most Qu systems; based upon current firmware and options, subject to change). If
you have a long show, you may end up loading a second show during intermission just to have enough scenes to work with.

If you use Chataigne to trigger your scenes, (or any external Midi sequencer for that matter), you are no longer limited to
sequential scene choices - you can access a scene randomly, which means it can act more as a sound preset than a scene.
For example, if you are handling 10 wireless mics and they are not always all on stage for the entire show, you can make a
mic matrix to know how many scenes you need to record so that only the necessary mics are unmuted at their defualt levels.
Recall that scene (randomly now!) whenever those mics are on stage and you have fewer keypresses to deal with. Since the console
is NOT in DAW mode, you still have full manual control over every existing button or function as you did prior.

Be sure to check the Midi channels in the console settings so that the Chataigne out channel is matching the console in channel.
Note for Mac users - the console is CoreAudio compliant (as of this writing) so no additional drivers or driver configuration 
is required. You do NOT need to have the A&H Midi Control App installed and running as this is native/raw Midi.
=========================================================================================
