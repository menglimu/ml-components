/**
 * 表格的基础使用
 */
import { MlTable, MlTableProps } from "types/table";
import Vue from "vue";

const tableData = [
  {
    idCcNewsManage: "8f3122df-d0a0-4ee5-8d00-65c559c8d8e3",
    newsCategory: "",
    newsTitle: "1",
    glanceNum: 0,
    newsSort: 0,
    publishTime: "2020-01-14 16:36:55",
    newsSource: "1002",
    newsStatus: "0",
    newsPromulgator: "发布人",
    newsModel: "2",
    delFlag: "",
    creatTime: "2020-01-14 16:19:56",
    creatUser: "",
    updateTime: "2020-02-25 16:58:06",
    updateUser: "",
    delUser: "",
    remark: "",
    newsContent: "<p>111111</p>",
    sourceName: "",
    modelName: "",
    ids: "",
    fileIds: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606369809299&di=af56d824b57283f20e7b5edd0bf99c05&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F18%2F37%2F01300000342079124824374452584.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606369809299&di=af56d824b57283f20e7b5edd0bf99c05&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F18%2F37%2F01300000342079124824374452584.jpg",
    ],
    svg: "activate",
  },
];

const tableRes = {
  content: tableData,
  // content: [], // tableData, // Array(6).fill(tableData[0]),
  total: 1,
};

let options = [
  { label: "怼怼", value: 1 },
  { label: "冠军", value: 2 },
];

export default Vue.extend({
  name: "TableBase",
  data() {
    return {
      tableConfig: null as MlTableProps,
      hideOneColumn: false,
    };
  },
  created() {
    this.tableConfig = {
      searchConfig: {
        // hideIndex: 6,
        // aloneLineBtn: false,
        // isOverHide: false,
        config: {
          labelPosition: "top",
          columns: [
            {
              type: "select",
              label: "通知公告",
              prop: "show",
              options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
              ],
            },
            {
              type: "string",
              label: "通知公告23",
              prop: "title",
              show: (data) => data.show === 1,
            },
            {
              type: "string",
              label: "通知公告",
              prop: "title",
            },
            {
              type: "string",
              label: "通知公告",
              prop: "title",
            },
            {
              type: "string",
              label: "通知公告",
              prop: "title",
            },
            {
              type: "string",
              label: "通知公告",
              prop: "title",
            },
          ],
        },
      },
      // 参数的转换函数。可以直接在api、的list中处理
      beforeGetList: (type, params) => ({ ...params, a: 123 }),
      afterGetList: (type, data) => console.log(type, data),
      searchData: {},
      outerBtn: [
        { size: "small", name: "重新请求options", type: "primary", callback: this.reFormOptions },
        {
          evtType: "setValue",
          size: "small",
          name: "显示隐藏",
          type: "primary",
          showJudge: (data) => data.length > 0,
        },
        {
          type: "text",
          evtType: "mldelete",
          name: "删除",
        },
      ],

      innerBtn: [
        {
          type: "text",
          evtType: "mldelete",
          name: "删除",
          showJudge: { newsTitle: "1", newsModel: "2" },
        },
      ],
      paginationConfig: {
        background: true,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
      },
      config: {
        selection: true, // 多选，默认true
        index: true, // 序号 默认false
        // tableTree: true, // 是否tree，属性表格，根据业务加上的
        tableKey: "idCcNewsManage", // 主键，默认id
        tableOptWidth: "130px", // 表格操作宽度
        initSearch: true, // 初始化的时候，是否直接请求数据，
        nodeData: {
          props: {
            height: "500px",
          },
        },
        // 表格操作接口
        api: {
          list: (params) => {
            console.log(JSON.stringify(params));
            // const data = new Array(10).fill(tableData)
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(tableRes);
              }, 5000);
            });
          },
          delete: (ids, data) => {
            console.log(ids, data);
            this.onDelete();
            return Promise.resolve();
          },
        },
        columns: [
          {
            type: "string",
            label: "排序",
            prop: "newsSort",
            sortable: "custom",
          },
          {
            type: "string",
            label: "标题",
            prop: "newsTitle",
            key: "newsTitle1", // 重复prop时，需要给其中一个指定一个不同的key
            // sortable: true,
            render: (h, params) => {
              return (
                <div
                  onClick={this.onDetail.bind(this, params.row)}
                  style={`color: #1EA1FF; text-decoration: underline;cursor: pointer;`}
                >
                  {params.row.newsTitle}
                </div>
              );
            },
          },
          {
            type: "string",
            label: "标题",
            prop: "newsTitle",
          },
          {
            type: "string",
            label: "发布人",
            prop: "newsPromulgator",
            hide: () => this.hideOneColumn,
          },
          {
            type: "string",
            label: "浏览量",
            prop: "glanceNum",
          },
          {
            type: "svg",
            label: "图标",
            prop: "svg",
            statusJudge: () => "success",
            // icons: icons
          },
          {
            label: "发布时间",
            prop: "publishTime",
            statusJudge: {
              success: { newsTitle: "1", newsModel: "2" },
              error: { newsTitle: "1", newsModel: "2" },
              warning: { newsTitle: "1", newsModel: "2" },
              done: { newsTitle: "1", newsModel: "2" },
              failed: { newsTitle: "1", newsModel: "2" },
            },
            formatter: () => "slajdfkld",
          },
          {
            label: "更新时间",
            prop: "updateTime",
          },
          {
            label: "创建时间",
            prop: "creatTime",
          },
          {
            type: "select",
            label: "状态",
            prop: "newsStatus",
            options: [
              { label: "已提交", value: "0" },
              { label: "已上架", value: "1" },
              { label: "已下架", value: "2" },
            ],
          },

          {
            type: "select",
            label: "结构模式",
            prop: "newsModel",
            options: [
              {
                value: "1",
                label: "上下结构",
              },
              {
                value: "2",
                label: "左右结构",
              },
            ],
          },
          {
            type: "image",
            label: "封面图片",
            prop: "fileIds",
            statusJudge: {
              error: { newsTitle: "1", newsModel: "2" },
            },
          },
          {
            label: "自定义列",
            prop: "fileIds",
            renderColumn(h) {
              return (
                <el-table-column
                  label="自定义列"
                  scopedSlots={{
                    default: () => {
                      return <span>1234</span>;
                    },
                  }}
                ></el-table-column>
              );
            },
          },
          // {
          //   tag: 'ml-editor', //'c-table',
          //   label: '新闻内容',
          //   prop: 'newsContent',
          //   block: true,
          //   showTable: false
          // }

          // {
          //   type: 'string',
          //   label: '图标名称',
          //   prop: 'icon',
          //   showTable: true, // 是否在表格中展示
          //    // 搜索时使用，默认false
          //   addForm: true, // 新增时使用，默认true
          //   editForm: true, // 编辑时使用，默认true
          //   viewForm: true, // 查看是使用，默认true
        ],
      },
    };
  },
  methods: {
    onDelete() {
      this.$message.success("删除xxxxx");
    },
    onDetail() {
      this.$message.success("查看详情");
      this.hideOneColumn = !this.hideOneColumn;
    },
    reFormOptions() {
      options = [{ label: "易安", value: 1 }];
      (this.$refs.mainTable as MlTable).mlForm.reloadOptions("type");
    },
  },
  render() {
    return <ml-table ref="mainTable" props={this.tableConfig}></ml-table>;
  },
});
