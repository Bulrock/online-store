import "./style.css";
import logo from "./assets/rs_school.svg";
import icon from "./assets/github_icon.svg";
import { data } from "./components/data";

console.log("Hello World!");
console.log(data[0]);

const logoSchool = <HTMLImageElement>document.querySelector(".logo");

if (logoSchool) {
  logoSchool.setAttribute("src", logo);
}

const iconGit = document.querySelector(".icon");

if (iconGit) {
  iconGit.setAttribute("src", icon);
}
