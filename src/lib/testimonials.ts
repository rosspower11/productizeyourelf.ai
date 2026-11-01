const CDN = "https://aipowered-assets.com/aipowered-website/media/case-study";
const CASE_STUDY = "https://www.aipowered.xyz/case-study/students?student=";

export type QuoteCard = {
  kind: "quote";
  quote: string;
  name: string;
  role?: string;
  tone: "wash" | "white";
};

export type VideoCard = {
  kind: "video";
  name: string;
  poster: string;
  src: string;
  href: string;
};

export type ProofCard = QuoteCard | VideoCard;

const video = (name: string, slug: string, file: string, poster: string): VideoCard => ({
  kind: "video",
  name,
  poster: `/images/case-study/${poster}.jpg`,
  src: `${CDN}/${file}.mp4`,
  href: `${CASE_STUDY}${slug}`,
});

const VIDEOS = {
  eliot: video("Eliot", "eliot", "eliot-tom-highlights", "eliot-tom-highlights-poster"),
  simon: video("Simon", "simon", "simon-piccirillo-highlights", "simon-piccirillo-highlights-poster"),
  charlie: video("Charlie", "charlie", "charlie-parker-highlights", "charlie-parker-highlights-poster"),
  jamie: video("Jamie", "jamie", "jamie-roy-highlights", "jamie-roy-highlights-poster"),
  daniel: video("Daniel", "daniel", "daniel-acutt-highlights", "daniel-acutt-highlights-poster"),
  ashley: video("Ashley", "ashley", "ashley-blackmore-interview", "ashley-blackmore-interview-poster"),
  james: video("James", "james", "james-wilkinson-interview", "james-wilkinson-interview-poster"),
  miri: video("Miri", "miri", "miri-parada-case-study", "miri-poster"),
};

const q = (
  tone: QuoteCard["tone"],
  quote: string,
  name: string,
  role?: string,
): QuoteCard => ({ kind: "quote", tone, quote, name, role });

export const PROOF_ROW_ONE: ProofCard[] = [
  q("wash", "Easily the ==best money spent in 2026==. Every month of not getting involved into this is money left on the table imo.", "Adina Markowz"),
  q("white", "It was one of the ==best programmes I've invested in==. Yes, I learnt a huge amount about AI, but I also learnt more about myself, my business and how I want to work.", "Prue Nichols"),
  VIDEOS.eliot,
  q("wash", "The program is so well designed, not by Claude himself, but by the **creative, intelligent mind that Ross is**.", "Miri Parada", "The Offline Club"),
  q("white", "A great course whether you're technically minded or not. **Highly recommend this course** - Ross Power is excellent.", "Richard Buck", "Co-founder and Director"),
  VIDEOS.simon,
  q("wash", "It's **not just six weeks of learning Claude**. It's much more than that.", "Aline Magnier"),
  q("white", "Time well spent learning, collaborating and **building stuff that will be hugely valuable** to your work in future.", "Charlie Parker"),
  VIDEOS.charlie,
  q("wash", "I'm a slow learner but he **helped me out big time** and I owe him a lot for his last accelerator.", "Joshua Paurini"),
  q("white", "**Five stars doesn’t cut it.** Ross’s teaching style and the quality of his content make AI practical, accessible, and immediately usable.", "Michael Watts"),
  VIDEOS.jamie,
  q("wash", "The Claude accelerator helped me develop my brand identity and voice, two AI writing skills… to take Iona Debarge from **idea to a launch-ready plan**", "Iona Debarge"),
  q("white", "I am currently doing Ross’s AI Productize Yourself Accelerator and it is **mind blowingly good**… even newbies like me can understand it and literally accelerate through it.", "Nicole Posner"),
  q("wash", "The absolute **best in the business**… I’ve now increased my productivity. What feels like ==100 times== thanks to the insight shared", "Myles Maximilian"),
  q("white", "Ross is an **exceptional teacher**. He's patient, generous with his knowledge and has a real talent for making complex ideas feel simple without ever talking down to people.", "Sharon Callcut"),
];

export const PROOF_ROW_TWO: ProofCard[] = [
  q("white", "A huge thank you to Ross Power for making something that once seemed complicated feel **practical, relevant, and genuinely exciting**.", "Jane Thomas", "Founder, Premier Life Skills"),
  q("wash", "Ross is one of those rare teachers who **makes complex ideas feel simple** without ever making you feel out of your depth.", "Sharon Callcut"),
  VIDEOS.daniel,
  q("white", "Even as a **real beginner** you feel like you can learn how to get the best out of AI by the time you have finished the course.", "Iona Debarge"),
  q("wash", "I now certainly have the capability and equally important, the **confidence**, to use Claude in ways I could not have imagined previously!", "Lesley Thomas", "Creator of Decision Advantage, host of the Financial Judgement Podcast"),
  VIDEOS.ashley,
  q("white", "Setting up skill files and scheduled tasks were both moments when I thought **'ok I can see what all the hype is about now'**.", "Andrew Smith"),
  q("wash", "This was one of the ==best investments I made in my life==. I would do it again anytime.", "Ava Verena Ledig"),
  VIDEOS.james,
  q("white", "Arrived knowing basically nothing about Claude and left with a **landing page, brand kit and growth strategy** (all made in Claude of course)", "Sarah Falconer"),
  q("wash", "Ross is a pioneer in helping business owners to **build products and propositions that are compelling** and does this is a time effective and rapid way.", "Natasha Wallace"),
  VIDEOS.miri,
  q("white", "You can genuinely feel how much he cares about everyone in the room. He’s **deeply invested in helping people win**.", "Sarah Jenkinson"),
  q("wash", "Since attending the event, I’ve started using Claude regularly, and it has already made a **noticeable difference** in how I work and think about productivity.", "Fatma"),
  q("white", "The particular programme Ross delivers has **fundamentally changed my outlook** on the way I productize my business… Thanks Ross, ==life changing work==", "Andrew Morgan"),
];

export const PROOF_CARDS: ProofCard[] = [...PROOF_ROW_ONE, ...PROOF_ROW_TWO];
