import axios from 'axios';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function NewRepost(
  idPost,
  token,
  setUpdateListPosts,
  updateListPosts
) {
  async function repost() {
    const API_URL = process.env.REACT_APP_API_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    };

    try {
      await axios.post(`${API_URL}/repost/${idPost}`, null, config);
      setUpdateListPosts(updateListPosts + 1);
    } catch (error) {
      Notify.failure('Erro ao compartilhar post');
    }
  }

  Confirm.show(
    'Share?',
    'Do you want to repost this link?',
    'Yes, share!',
    'No, cancel',
    repost,
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
