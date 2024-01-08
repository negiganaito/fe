/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export const uiConfiguration = {
  company: {
    name: "Chi Thanh",
  },
  mainMenu: [
    {
      activeOnPaths: [
        "/home/*",
        "/home/key_updates/*",
        "/home/knowledge/*",
        "/home/orgsearch/*",
        "/home/saved/*",
        "/home/notes/*",
        "/home/org/*",
      ],
      children: [
        {
          icon: {
            uri: "/assets/menu/home/feed.png",
          },
          key: "feed",
          path: "/home",
          title: "Posts",
          type: "menu",
        },
        {
          icon: {
            uri: "/assets/menu/home/key_updates.png",
          },
          key: "key_updates",
          path: "/home/key_updates",
          title: "Key updates",
          type: "menu",
        },
        {
          icon: {
            uri: "/assets/menu/home/knowledge.png",
          },
          key: "knowledge",
          path: "/home/knowledge",
          title: "Knowledge library",
          type: "menu",
        },
        {
          icon: {
            uri: "/assets/menu/home/orgsearch.png",
          },
          key: "orgsearch",
          path: "/home/orgsearch",
          title: "Directory",
          type: "menu",
        },
        {
          icon: {
            uri: "/assets/menu/home/saved.png",
          },
          key: "saved",
          path: "/home/saved",
          title: "Saved",
          type: "menu",
        },
        {
          icon: {
            uri: "/assets/menu/home/notes.png",
          },
          key: "notes",
          path: "/home/notes",
          title: "Notes",
          type: "menu",
        },
        {
          icon: {
            uri: "/assets/menu/home/org.png",
          },
          key: "org",
          path: "/home/org",
          title: "Org chart",
          type: "menu",
        },
      ],
      key: "home",
      path: "/home",
      title: "Home",
      type: "menu",
      default_bookmark_count: 6,
    },
    {
      activeOnPaths: [
        "/knowledge/*",
        "/knowledge/categories/*",
        "/knowledge/collections/*",
      ],
      key: "knowledge",
      path: "/knowledge",
      title: "Knowledge Library",
      type: "menu",
      children: [
        {
          icon: {
            fbicon: {
              sprited: 2,
              spi: "/assets/workplace/4b6BjmIYKO8.png",
              _spi: "/assets/workplace/4b6BjmIYKO8.png",
              w: 20,
              h: 20,
              p: "0 -746px",
              sz: "auto",
            },
          },
          key: "home",
          path: "/knowledge",
          title: "Home",
          type: "menu",
        },
        {
          icon: {
            fbicon: {
              sprited: 2,
              spi: "/assets/workplace/IQ_qAGhgRyd.png",
              _spi: "/assets/workplace/IQ_qAGhgRyd.png",
              w: 20,
              h: 20,
              p: "-21px -263px",
              sz: "auto",
            },
          },
          key: "categories",
          path: "/knowledge/categories",
          title: "Categories",
          type: "menu",
        },
        // {
        //   icon: {
        //     uri: '',
        //   },
        //   key: 'collections',
        //   path: '/knowledge/collections',
        //   title: 'Collections',
        //   type: 'menu',
        // },
      ],
    },
  ],
};

export const defaultRoute = {
  home: "feed",
  knowledge: "home",
};
