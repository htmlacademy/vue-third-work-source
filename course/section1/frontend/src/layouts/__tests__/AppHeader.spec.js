import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AppHeader from "../AppHeader.vue";

describe("AppHeader", () => {
  it("renders properly", () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.text()).toContain(
      [
        "Найти",
        "Создать карточку",
        "Администратор",
        "Мой аккаунт",
        "Выйти",
      ].join("")
    );
  });
});
