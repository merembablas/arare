<template>
  <div
    :class="`flex cursor-pointer menu-item rounded-l-xl ${
      active ? 'selected' : 'menu-item-hover'
    } ml-2 mt-1 p-3 items-center`"
    @click="$emit('click')"
  >
    <div>
      <slot></slot>
    </div>
    <div :class="`ml-2 hidden md:block ${active ? 'text-black' : ''}`">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    active: { type: Boolean, required: true, default: false }
  }
}
</script>

<style lang="less" scoped>
@hover-color: lighten(@bg-color-1, 2%);
.menu-item.selected {
  font-family: 'RobotoSlab bold';
  background-color: #fff;
}
.menu-item-hover:hover {
  .linear-gradient(to right, @bg-color-1, #fff);
}
</style>