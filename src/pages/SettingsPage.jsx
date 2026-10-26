import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import {
  SettingHeading,
  SettingToggle,
  SettingSegment,
  SettingInput,
  SettingInfo,
  SettingAction,
  SettingPictures,
  SettingPalettes,
} from "../Components/SettingRows";
import { BEARS, OUTFITS } from "../data/bears";
import { PROFILE_OPTIONS } from "../data/profiles";
import { EXTRAS } from "../data/extras";
import { TONE_SAMPLES } from "../data/voice";
import { findLanguage } from "../data/languages";
import PALETTES from "../data/palettes";

function SettingsPage({
  prefs,
  userName,
  age,
  bearName,
  signedInWith,
  language,
  selected,
  theme,
  motion,
  praise,
  extras,
  onBack,
  onPref,
  onUserName,
  onAge,
  onBearName,
  onPickBear,
  onSignOut,
  onOpenLanguage,
  onChangeProfile,
  onToggleLayer,
  onMotion,
  onPraise,
  onExtra,
  onResetLearned,
  onDownload,
  onDeleteEverything,
  onComingSoon,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const chosen = PROFILE_OPTIONS.filter((option) => selected[option.id]).map((option) => option.label);
  const reminderStyle = prefs.reminderStyle || (theme === "adhd" ? "varied" : "same");
  const lang = findLanguage(language);

  const handleDelete = () => {
    if (confirmDelete) {
      onDeleteEverything();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="screen" style={{ gap: "10px" }}>
      <PageHeader title="Settings" backLabel="Back to Me" onBack={onBack} />

      <SettingHeading>Account</SettingHeading>
      <SettingInput label="Your name" value={userName} onChange={onUserName} />
      <SettingInput label="Your age" type="number" value={age} onChange={onAge} />
      <SettingInfo label="Signed in with" value={signedInWith || "This device only"} />
      <SettingAction label="Sign out" description="You can sign back in any time" onClick={onSignOut} />

      <SettingHeading>Your bear</SettingHeading>
      <SettingInput label="Your bear's name" value={bearName} onChange={onBearName} />
      <SettingPictures
        label="Choose your bear"
        description="Bruno has outfits to choose from. Clarkson always wears his vintage tweed."
        choices={BEARS.map((bear) => ({ id: bear.id, label: bear.name, thumb: bear.thumb }))}
        value={prefs.bear}
        onChange={onPickBear}
      />
      {prefs.bear === "bruno" ? (
        <SettingPictures
          label="Bruno's outfit"
          description="Only the clothes change. Bruno stays the same."
          choices={OUTFITS}
          value={prefs.outfit}
          onChange={(id) => onPref("outfit", id)}
        />
      ) : null}
      <SettingToggle
        label="Bear on screen"
        description="A small bear keeps you company while you use the app"
        isOn={prefs.companion}
        onToggle={() => onPref("companion", !prefs.companion)}
      />
      <SettingSegment
        label="Where it hangs out"
        description="It wakes up when you talk to me"
        value={prefs.pose}
        options={[["Sitting", "sit"], ["Sleeping", "sleep"], ["Climbing", "climb"]]}
        onChange={(value) => onPref("pose", value)}
      />
      <SettingSegment
        label="How I talk"
        description={TONE_SAMPLES[prefs.tone]}
        value={prefs.tone}
        options={[["Gentle", "gentle"], ["Direct", "direct"], ["Playful", "playful"]]}
        onChange={(value) => onPref("tone", value)}
      />
      <SettingAction label="How I'm set up for you" description={chosen.join(", ") || "Standard"} onClick={onChangeProfile} />
      <SettingAction
        label="Reset what I've learned"
        description={'Clears every note in "What I\'ve noticed" (in Plan)'}
        onClick={onResetLearned}
      />

      <SettingHeading>Reminders</SettingHeading>
      <SettingToggle label="Reminders" description="Nudges before things start" isOn={prefs.reminders} onToggle={() => onPref("reminders", !prefs.reminders)} />
      <SettingSegment
        label="Heads-up before things start"
        value={prefs.leadTime}
        options={[["5 min", "5"], ["10 min", "10"], ["30 min", "30"]]}
        onChange={(value) => onPref("leadTime", value)}
      />
      <SettingSegment
        label="Reminder style"
        description="Varied wording is harder to tune out"
        value={reminderStyle}
        options={[["Same each time", "same"], ["Varied", "varied"]]}
        onChange={(value) => onPref("reminderStyle", value)}
      />
      <SettingToggle label="Quiet hours" description="22:00 to 07:00, no nudges" isOn={prefs.quietHours} onToggle={() => onPref("quietHours", !prefs.quietHours)} />
      <SettingToggle label="Daily check-in" description="A gentle hello at 09:00" isOn={prefs.checkIn} onToggle={() => onPref("checkIn", !prefs.checkIn)} />

      <SettingHeading>Language</SettingHeading>
      <SettingAction label="Language" description={lang.native + " · " + lang.english} onClick={onOpenLanguage} />

      <SettingHeading>Appearance and comfort</SettingHeading>
      <SettingPalettes palettes={PALETTES} value={prefs.palette} onChange={(id) => onPref("palette", id)} />
      <SettingSegment
        label="Appearance"
        value={prefs.mode}
        options={[["Light", "light"], ["Dark", "dark"], ["Auto", "auto"]]}
        onChange={(value) => onPref("mode", value)}
      />
      <SettingSegment
        label="Text size"
        value={prefs.textSize}
        options={[["Small", "s"], ["Medium", "m"], ["Large", "l"]]}
        onChange={(value) => onPref("textSize", value)}
      />
      <SettingToggle label="Movement" description="Animations and celebration effects" isOn={motion} onToggle={onMotion} />
      <SettingToggle label="Celebrations" description="A small moment when you finish something" isOn={praise} onToggle={onPraise} />
      <SettingToggle label="Sounds" description="Soft sounds with reminders" isOn={prefs.sounds} onToggle={() => onPref("sounds", !prefs.sounds)} />
      <SettingToggle label="Vibration" description="A light buzz with reminders" isOn={prefs.vibration} onToggle={() => onPref("vibration", !prefs.vibration)} />
      <SettingToggle
        label="Reading support"
        description="Cream background, wider spacing, no capitals"
        isOn={!!selected.dyslexia}
        onToggle={() => onToggleLayer("dyslexia")}
      />
      <SettingToggle
        label="Times in words"
        description="Half past nine instead of 09:30"
        isOn={!!selected.dyscalc}
        onToggle={() => onToggleLayer("dyscalc")}
      />

      <SettingHeading>Extra help</SettingHeading>
      <span className="muted t-sm" style={{ marginTop: "-4px" }}>
        Some of these are switched on for how your brain works. You can turn any of them on or off.
      </span>
      {EXTRAS.map((extra) => (
        <SettingToggle
          key={extra.id}
          label={extra.label}
          description={extra.description}
          isOn={extras[extra.id]}
          onToggle={() => onExtra(extra.id)}
        />
      ))}

      <SettingHeading>Calendars</SettingHeading>
      <SettingToggle
        label="Google Calendar"
        description="Show an Add to Google Calendar button on meetings and dated tasks. It opens Google Calendar with everything filled in."
        isOn={prefs.calendar}
        onToggle={() => onPref("calendar", !prefs.calendar)}
      />
      <SettingInfo label="Apple Calendar" value="Coming soon" />

      <SettingHeading>Privacy and data</SettingHeading>
      <SettingInfo label="Where your data lives" value="On this device" />
      <SettingAction label="Download my data" description="A copy of your plans and notes" onClick={onDownload} />
      <SettingAction
        label="Delete my account and data"
        description={confirmDelete ? "Tap again to confirm. This cannot be undone." : "Removes everything, including what I've learned"}
        danger
        onClick={handleDelete}
      />

      <SettingHeading>Help and about</SettingHeading>
      <SettingAction label="Help centre" onClick={onComingSoon} />
      <SettingAction label="Send feedback" onClick={onComingSoon} />
      <SettingAction label="Terms of Service" onClick={onComingSoon} />
      <SettingAction label="Privacy Policy" onClick={onComingSoon} />
      <SettingInfo label="Version" value="0.1" />
    </div>
  );
}

export default SettingsPage;
