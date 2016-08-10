Dialog.addLayer = el(Dialog,
  el(Title, 'Add layer'),
  el(Form,
    el(Editbox, { label : 'Name' })
  ),
  el(Control,
    el(Button, 'OK'),
    el(Button, 'Cancel')
  )
);
