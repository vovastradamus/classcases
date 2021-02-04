import passStyle from "../src";

((el) => {
  console.time("classSets");
  el.classList.add(
    ...passStyle({
      ptb_r: 2,
      plr_r: 1,
      maa_r: 10,
      // fs_e: 2,
      ftw_l: true,
    }).split(" ")
  );
  console.timeEnd("classSets");
  el.innerHTML = "test";
  document.body.appendChild(el);
})(document.createElement("div"));
