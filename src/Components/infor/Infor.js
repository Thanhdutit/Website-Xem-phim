import './Infor.css';
import { useState } from 'react';

function Infor() {

  const [formData, setFormData] = useState({
    username: 'vanthanh',
    email: 'vanthanh@gmail.com',
    occupation: 'student',
    gender: 'male',
    languages: ['html'],
  })

  const onChangeHandler = (event) => {

    console.log(event)
    if (event.target.name === 'languages') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.languages.push(event.target.value)
      } else {
        copy.languages = copy.languages.filter(el => el !== event.target.value)
      }

      setFormData(copy)

    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formData)
  }
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Tên</label>
          <input className="form-control" name="username" onChange={onChangeHandler} value={formData.username} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input className="form-control" name="email" onChange={onChangeHandler} value={formData.email} />
        </div>
        <div className="form-group">
          <label htmlFor="occupation" className="form-label">Nghề nghiệp</label>
          <select className="form-select" name="occupation" onChange={onChangeHandler} value={formData.occupation}>
            <option value="student">Học sinh</option>
            <option value="employee">Nhân viên</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">Giới tính</label>
          <div>
            <div>
              <input type="radio" name="gender" value="male" onChange={onChangeHandler} checked={formData.gender === 'male'} />
              <label htmlFor="male">Nam</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" onChange={onChangeHandler} checked={formData.gender === 'female'} />
              <label htmlFor="female">Nữ</label>
            </div>
            <div>
              <input type="radio" name="gender" value="other" onChange={onChangeHandler} checked={formData.gender === 'other'} />
              <label htmlFor="other">Khác</label>
            </div>
          </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="gender" className="form-label">Languages</label>
          <div>
            <div>
              <input type="checkbox" name="languages" value="html" onChange={onChangeHandler} checked={formData.languages.indexOf('html') !== -1} />
              <label htmlFor="html">HTML</label>
            </div>
            <div>
              <input type="checkbox" name="languages" value="css" onChange={onChangeHandler} checked={formData.languages.indexOf('css') !== -1} />
              <label htmlFor="css">CSS</label>
            </div>
            <div>
              <input type="checkbox" name="languages" value="javascript" onChange={onChangeHandler} checked={formData.languages.indexOf('javascript') !== -1} />
              <label htmlFor="javascript">Javascript</label>
            </div>
          </div>
        </div> */}
        <div className="form-group">
          <button className="btn" type="submit" >Cập nhật</button>
        </div>
      </form>
    </div>
  );
}

export default Infor;
