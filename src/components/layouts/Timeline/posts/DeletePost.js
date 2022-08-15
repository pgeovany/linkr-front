import axios from 'axios';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function deletePost(
  token,
  idPost,
  setUpdateListPosts,
  updateListPosts
) {
  Confirm.show(
    'Do you really confirm?',
    'Are you sure you want to delete this post?',
    'Yes, delete it',
    'No, go back',
    async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const config = {
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        };
        await axios.delete(`${API_URL}/posts/${idPost}`, config);
        setUpdateListPosts(updateListPosts + 1);
      } catch (error) {
        Notify.failure('Não foi possível excluir o post');
      }
    },
    () => {}
  );
}

Confirm.init({
  className: 'notiflix-confirm',
  width: '300px',
  zindex: 4003,
  position: 'center',
  distance: '10px',
  backgroundColor: '#171717',
  borderRadius: '25px',
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  rtl: false,
  fontFamily: 'Quicksand',
  cssAnimation: true,
  cssAnimationDuration: 300,
  cssAnimationStyle: 'fade',
  plainText: true,
  titleColor: '#FFFFFF',
  titleFontSize: '16px',
  titleMaxLength: 34,
  messageColor: '#FFFFFF',
  messageFontSize: '14px',
  messageMaxLength: 110,
  buttonsFontSize: '15px',
  buttonsMaxLength: 34,
  okButtonColor: '#1877F2',
  okButtonBackground: '#FFFFFF',
  cancelButtonColor: '#f8f8f8',
  cancelButtonBackground: '#1877F2',
});
