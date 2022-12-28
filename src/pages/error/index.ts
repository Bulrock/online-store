import "./error.css";
import logo from "../../assets/rs_school.svg";
import icon from "../../assets/github_icon.svg";
import errorIcon from "../../assets/error-404.svg";

const logoSchool = <HTMLImageElement>document.querySelector(".logo");

if (logoSchool) {
  logoSchool.setAttribute("src", logo);
}

const iconError = <HTMLImageElement>document.querySelector(".icon-error");

if (iconError) {
  iconError.setAttribute("src", errorIcon);
}

const iconGit1 = <HTMLImageElement>document.querySelector(".github-icon1");
const iconGit2 = <HTMLImageElement>document.querySelector(".github-icon2");

if (iconGit1 && iconGit2) {
  iconGit1.setAttribute("src", icon);
  iconGit2.setAttribute("src", icon);
}
