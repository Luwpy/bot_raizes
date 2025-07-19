import { setupMenu } from "./setup.js";
import { profileMenu } from "./profile.js";
import { simpleTabsMenu } from "./tabs.js";

export const menus = {
  setup: {
    main: setupMenu,
  },
  profile: {
    main: profileMenu,
  },

  tabs: simpleTabsMenu,
};
