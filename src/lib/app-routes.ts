export const appRoutes = {
  home: "/home",
  blog: "/home/blog",
  learning: "/home/learning",
  community: "/home/community",
  courses: "/home/courses",
} as const

export const landingNavItems = [
  { name: "Blog", link: appRoutes.blog },
  { name: "Learning", link: appRoutes.learning },
  { name: "Community", link: appRoutes.community },
  { name: "Courses", link: appRoutes.courses },
] as const
