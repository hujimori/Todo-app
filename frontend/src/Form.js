import React, {Component} from 'react';
import './form.css'

class Form extends Component {
    render() {
        return (
            <div className="form">
                <form onSubmit={this.props.handleSubmit}>
                    <input name="title" type="text" placeholder="タイトル ※必須" defaultValue="reactの学習"/><br/>
                    <textarea name="desc" placeholder="説明を入力" defaultValue="todoアプリを作っています"></textarea><br/>
                    <button type="submit">todoを作成</button>
                </form>
            </div>
        )
    }
}

export default Form