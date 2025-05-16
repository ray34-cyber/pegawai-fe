import Swal from 'sweetalert2';

export const showErrorAlert = (title: string, text: string) => {
  Swal.fire({ icon: 'error', title, text });
};
