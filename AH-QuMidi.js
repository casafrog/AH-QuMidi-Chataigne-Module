/* Chataigne Module for Special MIDI Module for Allen&Heath Qu Series Audio Mixers v1.0.0 - T.Hyde c2026 www.casafrog.com
========================================================================================================
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


Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.
3. The name of the author may not be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
=========================================================================================
*/ 

function init()
{
    //local.scripts.ahqu-midi.enableLog.set(true);
    script.log("Script Init");
}

function moduleParameterChanged(param) 
{
    script.log("Module name: " + local.name);
}

function selectscene_action(scene)
{   var midichannel = local.parameters.midiSendChannel.get();
    script.log("Scene Change Selected" + scene);
    local.sendCC(midichannel, 0, 0); // channel 1, bank 0
    local.sendProgramChange(midichannel, scene - 1); // channel 1 scene 1 (offset +1)
}

function mute_action(channel)
{
    var midichannel = local.parameters.midiSendChannel.get();
    script.log("Channel Mute Selected");
    single_mute(midichannel, channel + 31, true);
}

function unmute_action(channel)
{
    var midichannel = local.parameters.midiSendChannel.get();
    script.log("Channel Unmute Selected");
    single_mute(midichannel, channel + 31, false);
}

function stmute_action(muteInfo,st1,st2,st3)
{
    var midichannel = local.parameters.midiSendChannel.get();
    script.log("ST Mute Selected");
    single_mute(midichannel, 64, st1);
    single_mute(midichannel, 65, st2);
    single_mute(midichannel, 66, st3);
}

function dcamute_action(muteInfo,dca1,dca2,dca3,dca4)
{
    var midichannel = local.parameters.midiSendChannel.get();
    script.log("DCA Mute Selected");
    single_mute(midichannel, 16, dca1);
    single_mute(midichannel, 17, dca2);
    single_mute(midichannel, 18, dca3);
    single_mute(midichannel, 19, dca4);
}

function groupmute_action(muteInfo,mg1,mg2,mg3,mg4)
{
    var midichannel = local.parameters.midiSendChannel.get();
    script.log("MuteGroup Mute Selected");
    single_mute(midichannel, 80, mg1);
    single_mute(midichannel, 81, mg2);
    single_mute(midichannel, 82, mg3);
    single_mute(midichannel, 83, mg4);
}

function fxmute_action(muteInfo,fxr1,fxr2,fxr3,fxr4,fxs1,fxs2,fxs3,fxs4)
{
    var midichannel = local.parameters.midiSendChannel.get();
    script.log("FX Mute Selected");
    single_mute(midichannel, 8, fxr1);
    single_mute(midichannel, 9, fxr2);
    single_mute(midichannel, 10, fxr3);
    single_mute(midichannel, 11, fxr4);
    single_mute(midichannel, 0, fxs1);
    single_mute(midichannel, 1, fxs2);
    single_mute(midichannel, 2, fxs3);
    single_mute(midichannel, 3, fxs4);

}

function detailmute_action(muteInfo,ch01,ch02,ch03,ch04,ch05,ch06,ch07,ch08,ch09,ch10,ch11,ch12,ch13,ch14,ch15,ch16,ch17,ch18,ch19,
    ch20,ch21,ch22,ch23,ch24,ch25,ch26,ch27,ch28,ch29,ch30,ch31,ch32,ch33,ch34,ch35,ch36,st1,st2,st3,dca1,dca2,dca3,dca4,mg1,mg2,mg3,mg4,
    fxr1,fxr2,fxr3,fxr4,fxs1,fxs2,fxs3,fxs4,mix1master)
{
    // js implementation sends parameters individually versus as objects, so we get to brute force this.
    var midichannel = local.parameters.midiSendChannel.get();
    single_mute(midichannel, 32, ch01);
    single_mute(midichannel, 33, ch02);
    single_mute(midichannel, 34, ch03);
    single_mute(midichannel, 35, ch04);
    single_mute(midichannel, 36, ch05);
    single_mute(midichannel, 37, ch06);
    single_mute(midichannel, 38, ch07);
    single_mute(midichannel, 39, ch08);
    single_mute(midichannel, 40, ch09);
    single_mute(midichannel, 41, ch10);
    single_mute(midichannel, 42, ch11);
    single_mute(midichannel, 43, ch12);
    single_mute(midichannel, 44, ch13);
    single_mute(midichannel, 45, ch14);
    single_mute(midichannel, 46, ch15);
    single_mute(midichannel, 47, ch16);
    single_mute(midichannel, 48, ch17);
    single_mute(midichannel, 49, ch18);
    single_mute(midichannel, 50, ch19);
    single_mute(midichannel, 51, ch20);
    single_mute(midichannel, 52, ch21);
    single_mute(midichannel, 53, ch22);
    single_mute(midichannel, 54, ch23);
    single_mute(midichannel, 55, ch24);
    single_mute(midichannel, 56, ch25);
    single_mute(midichannel, 57, ch26);
    single_mute(midichannel, 58, ch27);
    single_mute(midichannel, 59, ch28);
    single_mute(midichannel, 60, ch29);
    single_mute(midichannel, 61, ch30);
    single_mute(midichannel, 62, ch31);
    single_mute(midichannel, 63, ch32);
    single_mute(midichannel, 64, st1);
    single_mute(midichannel, 65, st2);
    single_mute(midichannel, 66, st3);
    single_mute(midichannel, 16, dca1);
    single_mute(midichannel, 17, dca2);
    single_mute(midichannel, 18, dca3);
    single_mute(midichannel, 19, dca4);
    single_mute(midichannel, 80, mg1);
    single_mute(midichannel, 81, mg2);
    single_mute(midichannel, 82, mg3);
    single_mute(midichannel, 83, mg4);
    single_mute(midichannel, 8, fxr1);
    single_mute(midichannel, 9, fxr2);
    single_mute(midichannel, 10, fxr3);
    single_mute(midichannel, 11, fxr4);
    single_mute(midichannel, 0, fxs1);
    single_mute(midichannel, 1, fxs2);
    single_mute(midichannel, 2, fxs3);
    single_mute(midichannel, 3, fxs4);
    single_mute(midichannel, 12, mix1master);
}



function single_mute(midichannel, mutechannel, state)
{
    if(state)
    {
        local.sendNoteOn(midichannel, mutechannel, 126); // mute
    }
    else
    {
        local.sendNoteOn(midichannel, mutechannel, 1); //unmute
    }
}

// REFS
    // Channel / Element Muting
    // 32 note offset, 1-32 direct as channels, not the strip numbers
    // This is a real match to AH Qu32 Chrome as the Qu-midi document is a little obscure....

    // CH01	32
    //    ...
    // CH32	63
    // ST1	64
    // ST2	65
    // ST3	66
    // FX1 00 (Sends)
    // FX2 01
    // FX3 02
    // FX4 03
    // FX1 08 (Rtn)
    // FX2 09
    // FX3 10
    // FX4 11
    //Mix1Master 12
    // MG1 80
    // MG2 81
    // MG3 82
    // MG4 83
    // DCA1	16
    // DCA2	17
    // DCA3	18
    // DCA4	19

    //local.sendNoteOn(1,65,126); // mute (not 127 per dox)
    //local.sendNoteOn(1,65,1); //unmute

    // SCENE -> PROGRAMCHANGE NUMBER IS OFFSET BY -1 (thus Scene1 is value 0)

    // eg scene 1
    // local.sendCC(1, 0, 0); // channel 1, bank 0
    //local.sendProgramChange(1, 0); // channel 1 scene 1 (offset +1)

    //    local.sendNoteOn(local.parameters.midiChannel.send.get(), note, 127);
    //    local.sendNoteOff(local.parameters.midiChannel.send.get(), note);
    //    local.sendCC(local.parameters.midiChannel.send.get(), channelNumber, level);

    // JS method references
    //sendNoteOn(channel, pitch, velocity)	This will send a Note On event on the module's output MIDI device.	local.sendNoteOn (1, 12, 127);
    //sendNoteOff(channel, pitch)	This will send a Note Off event on the module's output MIDI device.	local.sendNoteOff (1, 12);
    //sendCC(channel, pitch, velocity)	This will send a Control Change event on the module's output MIDI device.	local.sendCC (3, 20, 65);
    //sendSysex(byte1, byte2, byte3, ...)	This will send a Sysex message on the module's output MIDI device. You can add as many arguments you want in the Sysex message.	local.sendSysex (10, 15,20,20,0);
    //sendPitchWheel(channel, value)	This will send a Pitch Wheel event on the module's output MIDI device.	local.sendPitchWheel (3, 2000);
    //sendChannelPressure(channel, value)	This will send a Channel Pressure event on the module's output MIDI device.	local.sendChannelPressure (1, 67);
    //sendAfterTouch(channel, note, value)	This will send an After Touch event on the module's output MIDI device.	local.sendAfterTouch (3, 20, 65);
    //sendProgramChange(channel, program)	This will send  a Program Change event on the module’s output MIDI device.	local.sendProgramChange((5, 99)


