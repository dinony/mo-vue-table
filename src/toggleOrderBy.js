let cb = null

export const moToggleOrderBy = {
  bind: (el, binding, vnode) => {
    const onClick = ([context, column]) => () => context.$emit('moToggleOrderBy', column)
    cb = onClick([vnode.context, binding.value])
    el.addEventListener('click', cb)
  },
  unbind: el => {
    el.removeEventListener('click', cb)
  }
}
