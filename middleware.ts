export { default } from "next-auth/middleware";

export const config = {
  marcher: ["/issues/new", "issues/edit/:id+"],
};
