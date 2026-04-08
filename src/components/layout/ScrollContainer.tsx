import { Section } from "./Section";
import { HeroContent } from "@/components/html/HeroContent";
import { OverviewSection } from "@/components/html/OverviewSection";
import { StringSection } from "@/components/html/StringSection";
import { ScalesSection } from "@/components/html/ScalesSection";
import { InteractiveSection } from "@/components/html/InteractiveSection";
import { MusicOverlay } from "@/components/html/MusicOverlay";
import { FooterCredits } from "@/components/html/FooterCredits";
import { NavigationDots } from "@/components/html/NavigationDots";
import { STRING_DATA } from "@/config/scroll-sections";
import { GUITAR_STRINGS } from "@/config/strings";

const STRING_SECTION_IDS = [
  "string-e2",
  "string-a2",
  "string-d3",
  "string-g3",
  "string-b3",
  "string-e4",
];

export function ScrollContainer() {
  return (
    <div className="relative z-10" style={{ height: "1200vh" }}>
      <Section id="hero">
        <HeroContent />
      </Section>

      <Section id="overview">
        <OverviewSection />
      </Section>

      {/* 6 secoes - uma por corda */}
      {STRING_DATA.map((data, i) => (
        <Section key={data.id} id={STRING_SECTION_IDS[i]} interactive>
          <StringSection
            sectionId={STRING_SECTION_IDS[i]}
            stringIndex={i}
            name={data.name}
            number={data.number}
            note={data.note}
            frequency={data.frequency}
            type={data.type}
            description={data.description}
            curiosity={data.curiosity}
            color={data.color}
            freq={GUITAR_STRINGS[i].frequency}
          />
        </Section>
      ))}

      <Section id="scales" interactive>
        <ScalesSection />
      </Section>

      <Section id="interactive" interactive>
        <InteractiveSection />
      </Section>

      <Section id="music">
        <MusicOverlay />
      </Section>

      <Section id="footer" interactive>
        <FooterCredits />
      </Section>

      <NavigationDots />
    </div>
  );
}
