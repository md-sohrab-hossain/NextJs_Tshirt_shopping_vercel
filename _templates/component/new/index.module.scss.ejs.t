---
to: src/components/<%= component %>/<%= h.toLowercase(name) %>/index.module.scss
---

.<%= h.createBaseClassName(component, name) %> {
  $root: &;
  color: $color-base-black;
}
