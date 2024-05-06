export class WindowUtils {
  static lockScroll() {
    document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
    document.body.style.overflowY = "hidden";
  }

  static unlockScroll() {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  }
}
