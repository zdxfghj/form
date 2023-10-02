import * as Yup from 'yup';
import { Formik,Form,Field,ErrorMessage,useField } from 'formik';

const MyCheckbox= ({children, ...props})=>{
    const [field, meta] = useField({...props,type: "checkbox"})
    return(
        <>
            <label className='checkbox'>
                <input type= "checkbox" {...props}{...field}/>
                {children}
            </label>
            {meta.touched && meta.error? (<div className='error'>{meta.error}</div>) : null}
        </>
    )
}

const CustomForm =()=>{
    return(
         <Formik
            initialValues = {{
                name:"",
                email: "",
                amount:0,
                currency: "",
                text: "",
                terms: false}}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2,"Минимальное количество символов 2")
                        .required("Обязательное поле"),
                email: Yup.string()
                          .email("Неверный формат email")
                          .required("Обязательное поле"),
                amount: Yup.number()
                          .required('Сумма обязательна')
                          .min(5, 'Не менее 5'),
                currency: Yup.string()
                          .required('Выберите валюту'),
                text: Yup.string()
                          .min(10, 'Не менее 10 символов'),
                terms: Yup.boolean()
                          .required('Необходимо согласие')
                          .oneOf([true],'Необходимо согласие')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
        >
            <Form className='form'>
                <h2>Отправить пожертвование</h2>

                <label htmlFor="name">Ваше имя</label>
                <Field 
                    id="name"
                    name="name"
                    type="text"
                    autoComplete = "off"
                />
                <ErrorMessage component="div" className='error' name='name'/>

                <label htmlFor="email">Ваша почта</label>
                <Field 
                    id="email"
                    name="email"
                    type="email"
                    autoComplete = "off"
                />
                <ErrorMessage component="div" className='error' name='email'/>
                
                <label htmlFor="email">Количество</label>
                <Field 
                     id="amount"
                     name="amount"
                     type="number"
                    autoComplete = "off"
                />
                <ErrorMessage component="div" className='error' name='amount'/>

                <label htmlFor="email">Валюта</label>
                <Field 
                      id="currency"
                      name="currency"
                      as="select"
                      autoComplete = "off"
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                    </Field>
                <ErrorMessage component="div" className='error' name='currency'/>

                <label htmlFor="email">Ваше сообщение</label>
                <Field 
                      id="text"
                      name="text"
                      as="textarea"
                      autoComplete = "off"
                    />
                <ErrorMessage component="div" className='error' name='currency'/>


                <MyCheckbox name="terms">
                      Соглашаетесь с политикой конфиденциальности?
                 </MyCheckbox>
               
                

                <button type="submit">Отправить</button>
            </Form>
        </Formik>

    )
}
export default CustomForm;