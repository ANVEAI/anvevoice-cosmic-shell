type NavigateFunction = (path: string) => void;

class NavigationManager {
  private navigateFn: NavigateFunction | null = null;

  setNavigate(fn: NavigateFunction) {
    this.navigateFn = fn;
  }

  navigate(path: string): boolean {
    if (this.navigateFn) {
      this.navigateFn(path);
      return true;
    }
    return false;
  }
}

export const navigationManager = new NavigationManager();
