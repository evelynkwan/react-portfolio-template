import { JSX } from "react";

interface AboutData {
  info: JSX.Element;
}

/**
 * TODO: replace `info` with your personal information.
 */
const aboutData: AboutData = {
  info: (
    <>
      <p>
        Hello there, my name is Evelyn, and I've lived in Boston my whole life,
        Currently, I'm a freshman studying at Boston University with an interst
        in product management and software development.
      </p>
      <p>
        I love all forms of art and learning new skills in different respects. 
        To learn more about what I've been working on, feel free to check out my 
        <a href="https://github.com/wderocco8">GitHub</a>{" "}.
      </p>
    </>
  ),
};

export default function About() {
  return (
    <>
      <h2 id="about">About me</h2>
      {aboutData.info}
    </>
  );
}
