function Modal() {
  this.node = {
    document : el({ class : 'modal' })
  };

  this.node.document.append(
    this.node.window = el({ class : 'modal_window' },
      this.node.chrome = el({ class : 'modal_chrome' },
        this.node.body = el({ class : 'modal_body' },
          this.node.content = el({ class : 'modal_content' })
        ),
        this.node.feet = el({ class : 'modal_feet' },
          this.node.control = el(Control, { class : 'modal_control' })
        )
      )
    )
  );
}

Component.extend(Modal);
