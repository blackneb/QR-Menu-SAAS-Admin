import React, {useState} from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MAIN_URL } from '../../redux/ActionTypes';
import { updateData } from '../../api/Api';
import { useSelector } from 'react-redux';


const ChangePassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const token = useSelector((state:any) => state.userInformation.userprofile.token)
    const onFinish = async (values: any) => {
      try {
        setLoading(true);
    
        const apiUrl = MAIN_URL + '/users/change-password/';
    
        const result: any | null = await updateData<any>(apiUrl, values, token);
    
        if (result !== null) {
          // Handle the result as needed, e.g., show a success message
          notification.success({
            message: 'Password Change',
            description: 'Password has been Changed successfully!',
          });
          // Reset the form or perform any other actions upon successful password change
        } else {
          // Handle the case where the password change fails
          console.error('Password change failed:', result);
        }
      } catch (error:any) {
        console.error('Password change failed:', error.message);
        // Handle errors, e.g., show an error message to the user
      } finally {
        setLoading(false);
      }
    };
  return (
    <section className="flex flex-col mt-8 md:flex-row justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <Form
            name="changePasswordForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[{ required: true, message: 'Please enter your old password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new_password"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={['new_password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#800020',
                    width: '180px',
                    borderColor: '#800020',
                  }}
                  loading={loading}
                >
                  {loading ? 'Changing Password' : 'Change Password'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
