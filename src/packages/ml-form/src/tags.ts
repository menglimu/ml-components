class Tags {
  TagButton = 'button'
  TagForm = 'form'
  TagFormItem = 'form-item'
  TagOption = 'option'
  prefix = ''
  constructor(framework = 'cui') {
    this.setTags(framework)
  }
  setTags(framework = 'cui') {
    this.prefix = { cui: 'c-', 'element-ui': 'el-' }[framework]
    this.TagButton = this.prefix + this.TagButton
    this.TagForm = this.prefix + this.TagForm
    this.TagFormItem = this.prefix + this.TagFormItem
    this.TagOption = this.prefix + this.TagOption
  }
}

export default Tags
