import React, { Component } from 'react';
import moment from 'moment';
import {
  Table,
  Form,
  Button,
  Card,
  Icon
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi/locale';
const FormItem = Form.Item;
let id=1; //定义全局变量  每次添加数据id增加

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {id: 0, text: '测试数据!', datatime: new Date()},
        {id: 1, text: '测试数据2!', datatime: new Date()},
      ],
    };
    this.DeleteItem=this.DeleteItem.bind(this);
  }
  handleSubmit (event) {
    event.preventDefault()
    let text = this.refs.content.value
    if (!text.trim()) {
      alert("输入不能为空！")
      return
    }
    id++;
    this.AddTodoItem({id,text,datatime: new Date()});
  }
    AddTodoItem(newItem){
      let newdata = this.state.dataSource.concat(newItem);
      this.state.dataSource.push(newItem);
      this.setState({dataSource : newdata});
    }
    DeleteItem (e) {
    let index = e;  //获取要删除的下标
    const DelDataSource = this.state.dataSource;
    DelDataSource.splice(index, 1);
    this.setState({
      dataSource: DelDataSource,
    });
  }
  render() {
    const column= [
      {title:'ID', dataIndex: 'id',key:'primary',width:50},
      {title: '内容', dataIndex: 'text',key:'text',width:120},
      {title: '创建时间', dataIndex: 'datatime',key:'datatime',width:200,
        render: (text, record, index) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {title: '操作',dataIndex: 'operation',key: 'operation',
        render: (text, record, index) => {
          return <Icon type="delete"  onClick={this.DeleteItem.bind(this,index)} />//data-index现在为获得index的下标，上面的删除data-index即是获取index的下标
        },
      }
    ]
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem>
              <input placeholder={formatMessage({ id: 'form.todoList.placeholder' })} ref='content' style={{height: 30}}/>
              <Button type="primary" htmlType="submit" style={{marginLeft: 8}} >
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
          <Table
            dataSource={this.state.dataSource}
            columns={column}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TodoList;
