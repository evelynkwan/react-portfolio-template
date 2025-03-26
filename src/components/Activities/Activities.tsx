import Activity, { ActivityProps } from "./Activity";
import "./Activities.css";

/**
 * TODO: replace each `imgSrc`, `imgAlt`, `title`, `description`
 * and `quicklinks` with your project information.
 */
const activities: ActivityProps[] = [
  // Activity 1
  {
    imgSrc: "/images/activities/activity1.jpeg",
    imgAlt: "UPE Initiation Project.",
    title: "Upsilon Pi Epsilon",
    description: (
      <>
        <p>
          I joined UPE in my first semester at BU. 
        </p>
        <p>
          UPE is a computing honor society. I love being in a a community of like-minded
          people who can help me out in my hard tech classes. 
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://github.com/evelynkwan/upe-intern-projects-f24", name: "UPE To-Do List" }
    ],
  },
  // Activity 2
  {
    imgSrc: "/images/activities/activity2.jpeg",
    imgAlt: "My PCT PC (Phi Chi Theta).",
    title: "BU Phi Chi Theta (PCT)",
    description: (
      <>
        <p>
          I joined PCT (a professional business fraternity) my second 
          semeser at BU. It was probably one of the most impactful decsions
          I've made in terms of the <strong>friends</strong> made,{" "}
          <strong>skills</strong> acquired, and abundance of unique experiences.
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://bupct.com/", name: "BUPCT" }
    ],
  },
  // Activity 3
  {
    imgSrc: "/images/activities/activity3.jpeg",
    imgAlt: "matcha.",
    title: "Making Matcha",
    description: (
      <>
        <p>
          I've always hated coffee and energy drinks are terrible for you.
          Not only does matcha taste good, it looks good and is great for you. 
          
        </p>
        <p>
          This slowly grew into a passion, and now is something that I love to try 
          whenever I see matcha on the menu!
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://ippodotea.com/products/sayaka-no-mukashi", name: "My Favorite Matcha" }
    ],
  },
  // Activity 4
  {
    imgSrc: "/images/activities/activity4.jpeg",
    imgAlt: "wics.",
    title: "Women in CS",
    description: (
      <>
        <p>
          As a woman in tech, it's scary to be in a lecture dominated by men who 
          started coding from the womb. That's why I love my WiCS community. 
          I started as an UCR and now I am the social media manager.
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://bostonwics.github.io", name: "BU WiCS" }
    ],
  },
];

/**
 * `Activities` returns a list of `Activity` components,
 * defined in the following component. Be sure to replace
 * all of the information in this file (do not edit `Activity.tsx`
 * only edit list of `activities` above.)
 */
export default function Activities() {
  return (
    <>
      {/* TODO: with your info --> */}
      <h2 id="interests">How I spend my free time?</h2>
      <div className="interests-table-container">
        <table className="interests-table">
          <tbody>
            {activities.map((activity, index) => (
              <Activity
                key={index}
                imgSrc={activity.imgSrc}
                imgAlt={activity.imgAlt}
                title={activity.title}
                description={activity.description}
                quicklinks={activity.quicklinks}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
