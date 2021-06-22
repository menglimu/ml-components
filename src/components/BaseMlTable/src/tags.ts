class Tags {
  TagButton = 'button'
  TagTable = 'table'
  TagTableColumn = 'table-column'
  TagPagination = 'pagination'
  constructor(framework = 'cui') {
    this.setTags(framework)
  }
  setTags(framework = 'cui') {
    const prefix = { cui: 'c-', 'element-ui': 'el-' }[framework]
    this.TagButton = prefix + this.TagButton
    this.TagTable = prefix + this.TagTable
    this.TagTableColumn = prefix + this.TagTableColumn
    this.TagPagination = prefix + this.TagPagination
  }
}

export default Tags
