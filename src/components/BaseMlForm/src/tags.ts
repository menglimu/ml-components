class Tags {
  public prefix = '';

  public TagButton = 'button';
  public TagForm = 'form';
  public TagFormItem = 'form-item';
  public TagOption = 'option';

  public constructor(framework = 'element-ui') {
    this.setTags(framework);
  }
  private setTags(framework = 'element-ui') {
    this.prefix = { cui: 'c-', 'element-ui': 'el-' }[framework];
    this.TagButton = this.prefix + this.TagButton;
    this.TagForm = this.prefix + this.TagForm;
    this.TagFormItem = this.prefix + this.TagFormItem;
    this.TagOption = this.prefix + this.TagOption;
  }
}

export default Tags;
