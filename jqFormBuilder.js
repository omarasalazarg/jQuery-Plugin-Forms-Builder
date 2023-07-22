/**
 * colorpickermini - experimental
 * @param {*} options 
 * @returns jQuery object
 */
function colorpickermini(options = {}) {
    var defaults = {
        color: "black",
        showInput: true,
        change: function (color) {
            jQuery(this).css({
                "background-color": options.color,
            });
        },
    };
    var options = jQuery.extend({}, defaults, options);
    return jQuery("<span />", {
        css: {
            "background-color": options.color,
        },
        "class": "color-picker-spectrum",
        html: "",
    }).spectrum({
        showInput: options.showInput,
        change: options.change,
    });
}
/**
 * accordion - experimental
 * @param {*} options 
 * @returns jQuery object
 */
function accordion(options = {}) {
    return jQuery("<div />", {
        id: "accordion",
        "class": "accordion",
        html: [
            jQuery("<div />", {
                "class": 'accordion-item',
                html: [
                    jQuery("<h2 />", {
                        id: "headingOne",
                        "class": "accordion-header",
                        html: jQuery("<button />", {
                            attr: {
                                "type": "button",
                                "data-bs-toggle": "collapse",
                                "data-bs-target": "#collapseOne",
                                "aria-expanded": "true",
                                "aria-controls": "collapseOne",
                            },
                            "class": "accordion-button",
                            html: "Accordion Item #1",
                        }),
                    }),
                    jQuery("<div />", {
                        id: "collapseOne",
                        attr: {
                            "aria-labelledby": "headingOne",
                            "data-bs-parent": "#accordionExample",
                        },
                        "class": "accordion-collapse collapse show",
                        html: jQuery("<div />", {
                            "class": "accordion-body",
                            html: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
                        }),
                    }),
                ],
            }),
        ],
    });
}
/**
 * form_group - experimental
 * @param {*} options 
 * @returns jQuery object
 */
function form_group(options = {}) {
    var defaults = {
        for: 'name',
        label: 'Name',
        html: null,
    };
    var options = jQuery.extend({}, defaults, options);
    return jQuery("<div />", {
        "class": "form-group",
        html: [
            jQuery("<label />", {
                attr: {
                    for: options.for,
                },
                html: options.label,
            }),
            html,
        ],
    });
}
function uploadImage(file) {
    var formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
        jQuery.ajax({
            url: '../../admin/actions/upload.php',
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false,
            contentType: false,
            success: function (request, textStatus, jqXHR) {
                resolve(request);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
            },
        });
    });
}
/**
 * jQuery forms plugin - 
 * @param {*} settings 
 * @returns object
 */
jQuery.fn.forms = function (settings = {}) {
    var el = jQuery(this)[0],
        $el = jQuery(el),
        controlsInfo = $el.find('.control-info'),
        controlsConstructorContainer = $el.find('.controls-constructor-container'),
        controlsContainer = $el.find('.controls-container').sortable({
            stop: function (event, ui) {
                var sortElements = $(this).sortable("toArray");
                var tempFields = [];
                $.each(sortElements, function (index, value) {
                    var tmpField = Controls.fields.filter(tmpField => tmpField.id === value)[0];
                    tempFields.push(tmpField);
                });
                Controls.fields = $.merge([], tempFields);
                return Controls.fields;
            },
        }),
        Controls = {},
        inputNames = {
            title: "Título",
            paragraph: "Párrafo",
            input: "Respuesta corta",
            textarea: "Respuesta larga",
            tel: "Teléfono",
            email: "Correo electrónico",
            single: "Selección simple",
            select: "Selección simple (Dropdown)",
            multiple: "Selección multiple",
            image: "Imágen",
            video: "Vídeos",
            file: "Archivos",
            date: "Fecha",
        },
        defaults = {
            identity: {
                name: null,
                info: null,
            },
            design: {
                styles: {
                    buttons: {
                        send: {
                            color: "white",
                            bgcolor: "rgb(147, 196, 125)",
                        },
                        reset: {
                            color: "black",
                            bgcolor: "white",
                        },
                    },
                    page: {
                        css: {
                            "background-color": "rgb(208, 224, 227)",
                            "background-image": "none",
                        },
                        backgroundType: "solid",
                        imageSrc: "https://linkea.pro/assets/img/bg1.jpg",
                        color: "rgb(208, 224, 227)",
                        colors: ["#16384b", "#22554c"],
                    },
                    fonts: {
                        name: {
                            color: "rgb(7, 55, 99)",
                            "font-family": "Rubik",
                            "font-weight": "normal",
                            "font-style": "normal",
                        },
                        info: {
                            color: "rgb(7, 55, 99)",
                            "font-family": "Rubik",
                            "font-weight": "normal",
                            "font-style": "normal",
                        },
                        headers: {
                            color: "black",
                            "font-family": "Rubik",
                            "font-weight": "normal",
                            "font-style": "normal",
                        },
                        base: {
                            color: "black",
                            "font-family": "Rubik",
                            "font-weight": "normal",
                            "font-style": "normal",
                        },
                        controls: {
                            color: "black",
                            "font-family": "Rubik",
                            "font-weight": "normal",
                            "font-style": "normal",
                        },
                    },
                    controls: {

                    },
                },
            },
        };

    settings.id = settings.id || uniqid();
    var Settings = jQuery.extend(true, {}, defaults, settings);
    console.log("Settings: %o", Settings);


    function init() {
        Controls = initControls();
    }

    /**
     * makeStatus - make jQuery object status layout
     * @experimental
     * @param {*} options 
     */
    function makeStatus(options = {}) {
        var defaults = {
            initials: "ND",
            name: "NO DEFINIDO",
            color: "orange",
            tools: [],
        };
        var options = jQuery.extend({}, defaults, options);
        jQuery("<li />", {
            id: uid,
            "class": "list-item-status",
            html: [
                jQuery("<div />", {
                    "class": "item-icon",
                    css: {
                        "background-color": options.color,
                    },
                    html: options.initials,
                }),
                jQuery("<div />", {
                    "class": "item-name",
                    html: options.name,
                }),
                jQuery("<div />", {
                    "class": "item-tools",
                    html: tools,
                }),
            ],
        })
    }

    function makeFontControl(options = {}) {
        var defaults = {
            id: uniqid(),
            label: "Control de fuente",
            name: "default",
            color: "black",
            bold: false,
            italic: false,
            font: "Roboto",
            bold_handler: function (event) { },
            italic_handler: function (event) { },
            color_handler: function (color) {
                jQuery(this).css({
                    "background-color": color.toHexString(),
                });
            },
        };
        var options = jQuery.extend({}, defaults, options);

        return jQuery("<div />", {
            "class": "form-group",
            html: [
                jQuery("<input />", {
                    id: "font-".concat(options.name).concat("-bold"),
                    attr: {
                        type: "checkbox",
                        name: "options",
                    },
                    prop: {
                        checked: options.bold,
                    },
                    click: options.bold_handler,
                }),
                jQuery("<label />", {
                    "class": "btn btn-default",
                    attr: {
                        for: "font-".concat(options.name).concat("-bold"),
                    },
                    html: "<i class=\"fas fa-bold\"></i>",
                }),
                jQuery("<input />", {
                    id: "font-".concat(options.name).concat("-italic"),
                    attr: {
                        type: "checkbox",
                        name: "options",
                    },
                    prop: {
                        checked: options.italic,
                    },
                    click: options.italic_handler,
                }),
                jQuery("<label />", {
                    "class": "btn btn-default",
                    attr: {
                        for: "font-".concat(options.name).concat("-italic"),
                    },
                    html: "<i class=\"fas fa-italic\"></i>",
                }),
                jQuery("<label />", {
                    "class": "btn p-0",
                    html: [
                        jQuery("<span />", {
                            css: {
                                "background-color": options.color,
                            },
                            "class": "color-picker-spectrum",
                            html: "",
                        }).spectrum({
                            color: options.color,
                            showInitial: false,
                            showInput: true,
                            hideAfterPaletteSelect: true,
                            change: options.color_handler,
                        }),
                        options.label,
                    ]
                }),
                jQuery("<select />", {
                    id: "fonts_".concat(options.name),
                    attr: {
                        "data-default": options.font,
                    },
                    "class": "form-control google-fonts d-block",
                }),
            ],
        });
    }

    /**
     * makeModal - Append DOM object to selector
     * @param {object} options 
     * @returns {$Object}
     */
    function makeModal(options = {}) {
        var defaults = {
            title: "Nuevo modal",
            mainContent: "Hola mundo",
            footerContent: [
                jQuery("<button />", {
                    class: "btn btn-outline-secondary",
                    attr: {
                        type: "button",
                        "data-dismiss": "modal",
                    },
                    html: "Cancelar",
                }),
                jQuery("<button />", {
                    class: "btn btn-outline-primary",
                    attr: {
                        type: "button",
                    },
                    html: "Aceptar",
                    click: options.handlerAccept || null,
                }),
            ],
            size: "",
            appendTo: "body",
            "class-background": "",
            "vertical-align": "modal-dialog-centered",
        };
        options = jQuery.extend({}, defaults, options);

        return jQuery("<div />", {
            id: "modal",
            attr: "modal",
            "class": "modal fade",
            attr: {
                "role": "dialog",
                "aria-hidden": true,
            },
            html: jQuery("<div />", {
                "class": "modal-dialog ".concat(options["vertical-align"]).concat(" ").concat(options.size),
                attr: {
                    role: "document",
                },
                html: jQuery("<div />", {
                    "class": "modal-content ".concat(options["class-background"]),
                    html: [
                        jQuery("<div />", {
                            "class": "modal-header",
                            html: [
                                jQuery("<h5 />", {
                                    "class": "modal-title",
                                    html: options.title,
                                }),
                                jQuery("<button />", {
                                    "class": "close",
                                    attr: {
                                        "data-dismiss": "modal",
                                        "aria-label": "Cerrar",
                                    },
                                    html: jQuery("<span />", {
                                        attr: {
                                            'aria-hidden': true,
                                        },
                                        html: "&times;",
                                    }),
                                }),
                            ],
                        }),
                        jQuery("<div />", {
                            "class": "modal-body",
                            html: options.mainContent,
                        }),
                        jQuery("<div />", {
                            "class": "modal-footer justify-content-between",
                            html: options.footerContent,
                        }),
                    ],
                }),
            }),
        })
            .appendTo(options.appendTo)
            .modal('show')
            .on('hidden.bs.modal', function (e) {
                jQuery(this).remove();
            });
    }
    /**
     * 
     * @param {*} field 
     * @returns 
     */
    function makeField(field = {}) {

        field.id = field.id || field.type.concat("_").concat(uniqid());
        field.type = field.type || 'input';
        field.hide = field.hide || 'false'; /** @deprecate Se esta usando visible */
        field.delete = field.delete || 'false';
        field.required = field.required || 'false';
        field.visible = field.visible || 'true';

        var $el = null,
            optionsContainer = null,
            inputInfo = null,
            inputTitle = null,
            inputPlaceholder = null,
            inputQuestion = null,
            inputRequired = null,
            inputVisible = null;

        jQuery(".forms-initial-message").hide();

        $el = jQuery("<div />", {
            id: field.id,
            "class": "card collapsed-card card-outline card-primary field-item field-type-".concat(field.type),
            html: [
                jQuery("<div />", { /* card-header */
                    "class": "card-header",
                    html: [
                        jQuery("<div />", {
                            "class": "card-title flex-column align-content-start align-items-start",
                            html: [
                                jQuery("<small />", {
                                    "class": "field-type",
                                    html: inputNames[field.type],
                                }),
                                jQuery("<p />", {
                                    "class": "field-name font-weight-bold mb-0",
                                    html: field.question || field.title || field.paragraph || null,
                                }),
                            ],
                        }),
                        jQuery("<div />", {
                            "class": "card-tools",
                            html: [
                                jQuery("<button />", {
                                    "class": "btn btn-tool text-gray",
                                    attr: {
                                        "data-card-widget": "collapse",
                                    },
                                    html: jQuery("<i />", {
                                        "class": "fas fa-angle-down",
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
                jQuery("<div />", { /* card-body */
                    "class": "card-body",
                    html: (function () {
                        if (field.type === "title") {
                            return [
                                jQuery("<div />", {
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            html: "Introduzca su título",
                                        }),
                                        field.$title = jQuery("<input />", {
                                            "class": "form-control",
                                            attr: {
                                                type: "text",
                                                value: field.title || null,
                                                placeholder: "Título",
                                            },
                                            keyup: function (e) {
                                                jQuery(this).closest(".field-item").find(".field-name").html(jQuery(this).val());
                                            },
                                        }),
                                    ],
                                }),
                            ];
                        }
                        else if (field.type === "paragraph") {
                            field.paragraph = field.paragraph || "";
                            return [
                                jQuery("<div />", {
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            html: "Introduzca un párrafo",
                                        }),
                                        field.$paragraph = jQuery("<input />", {
                                            "class": "form-control",
                                            attr: {
                                                type: "text",
                                                value: field.paragraph || null,
                                                placeholder: "Párrafo",
                                            },
                                            keyup: function (e) {
                                                jQuery(this).closest(".field-item").find(".field-name").html(jQuery(this).val());
                                            },
                                        }),
                                    ],
                                }),
                            ];
                        }
                        else if (field.type === "image") {
                            /**
                             * Layout de controles de imagenes
                             */
                            field.image = field.image || "https://linkea.pro/assets/img/bg1.jpg";
                            return jQuery("<div />", {
                                "class": "thumbnail-container",
                                html: [
                                    field.$image = jQuery("<div />", {
                                        "class": "thumbnail thumbnail-button",
                                        css: {
                                            "background-image": "url(".concat(field.image).concat(")"),
                                        },
                                        html: jQuery("<input />", {
                                            attr: {
                                                type: "file",
                                                accept: "image/*",
                                            },
                                            change: function (event) {
                                                if (this.files && this.files[0]) {
                                                    var files = this.files;
                                                    var reader = new FileReader();
                                                    field.$image.parent().addClass("uploading");
                                                    reader.onload = function (e, t) {
                                                        uploadImage(files[0])
                                                            .then((request) => {
                                                                var fieldSelected = Controls.fields.findIndex(fieldControl => fieldControl.id === field.id);
                                                                Controls.fields[fieldSelected].image = request.url;
                                                                Controls.fields[fieldSelected].$image.css("background-image", "url(".concat(request.url).concat(")"));
                                                                field.$image.parent().removeClass("uploading");
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                                Swal.fire({
                                                                    title: 'Error al cargar tu imagen',
                                                                    text: 'Ocurrio un error al intentar cargar tu imagen, por favor vuelve a intentar.',
                                                                    icon: 'error',
                                                                    confirmButtonText: 'Aceptar'
                                                                });
                                                                field.$image.parent().removeClass("uploading");
                                                            });
                                                        // Controls.fields[fieldSelected].image = e.target.result;
                                                    }
                                                    reader.readAsDataURL(this.files[0]);
                                                }
                                                else {
                                                    alert("Sorry - you're browser doesn't support the FileReader API");
                                                }
                                            },
                                        }),
                                    }),
                                    jQuery("<div />", {
                                        "class": "lds-ring",
                                        html: [
                                            jQuery("<div />"),
                                            jQuery("<div />"),
                                            jQuery("<div />"),
                                            jQuery("<div />"),
                                        ],
                                    }),
                                ],
                            });
                        }
                        else {
                            /**
                             * Layout de controles input, textarea, tel, email, single, select, multiple, date
                             */
                            return [
                                jQuery("<div />", {
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            html: "Introduzca su pregunta",
                                        }),
                                        inputQuestion = jQuery("<input />", {
                                            "class": "form-control",
                                            attr: {
                                                type: "text",
                                                value: field.question || null,
                                                placeholder: "Pregunta",
                                            },
                                            keyup: function (e) {
                                                jQuery(this).closest(".field-item").find(".field-name").html(jQuery(this).val());
                                            },
                                        }),
                                    ],
                                }),
                                (function () {
                                    if (field.type === 'single' || field.type === 'select' || field.type === 'multiple') {
                                        var $options = [];
                                        var optionsDefault = [
                                            {
                                                id: uniqid(),
                                                label: "Opción 1",
                                                value: null,
                                            },
                                            {
                                                id: uniqid(),
                                                label: "Opción 2",
                                                value: null,
                                            },
                                            {
                                                id: uniqid(),
                                                label: "Opción 3",
                                                value: null,
                                            },
                                        ].map((item) => {
                                            item.value = item.id
                                            return item;
                                        });
                                        field.options = field.options || optionsDefault;
                                        jQuery.each(field.options, function (index, option) {
                                            $options.push(
                                                field.options[index].$el = jQuery("<div />", {
                                                    "class": "field-".concat(field.type).concat("-item"),
                                                    html: [
                                                        jQuery("<div />", {
                                                            "class": "form-check",
                                                            html: [
                                                                jQuery("<input />", {
                                                                    id: option.id,
                                                                    attr: {
                                                                        name: "field-".concat(field.type).concat("-").concat(field.id),
                                                                        type: field.type === "multiple" ? "checkbox" : "radio",
                                                                        value: option.value,
                                                                    },
                                                                    "class": "form-check-input",
                                                                }),
                                                                jQuery("<label />", {
                                                                    attr: {
                                                                        contenteditable: true,
                                                                        for: option.id,
                                                                    },
                                                                    "class": "label-content-editable form-check-label",
                                                                    html: option.label/* .concat(" - ").concat(option.id) */,
                                                                    click: function (event) {
                                                                        event.preventDefault();
                                                                        jQuery(this).focus();
                                                                    },
                                                                    focus: function () {
                                                                        console.log("focus");
                                                                        jQuery(this).selText();
                                                                        jQuery(this).data('before', jQuery(this).html());
                                                                    },
                                                                    blur: function () {
                                                                        if (jQuery(this).data('before') !== jQuery(this).html()) {
                                                                            jQuery(this).data('before', jQuery(this).html());
                                                                            jQuery(this).trigger('change');
                                                                        }
                                                                    },
                                                                    change: function () {
                                                                        var optionSelected = field.options.findIndex(fieldOption => fieldOption.id === option.id);
                                                                        field.options[optionSelected].label = jQuery(this).html();
                                                                    }
                                                                }),
                                                            ],
                                                        }),
                                                        jQuery("<i />", {
                                                            "class": "fas fa-minus-circle",
                                                            click: function (event) {
                                                                var optionSelected = field.options.findIndex(fieldOption => fieldOption.id === option.id);
                                                                field.options[optionSelected].$el.remove();
                                                                field.options.splice(optionSelected, 1);
                                                            },
                                                        }),
                                                    ],
                                                }),
                                            );
                                        });
                                        field.$options = jQuery("<div />", {
                                            "class": "field-options",
                                            html: $options,
                                        });
                                        return jQuery("<div />", {
                                            "class": "field-options-container",
                                            html: [
                                                field.$options,
                                                jQuery("<div />", {
                                                    "class": "field-options-add-button",
                                                    html: jQuery("<a />", {
                                                        "class": "btn btn-block btn-outline-light",
                                                        html: "<i class=\"fas fa-plus-circle\"></i>",
                                                        click: function () {
                                                            /**
                                                             * Creando nueva opcion para single control
                                                             */
                                                            var id = uniqid();
                                                            var newFieldOption = {
                                                                id: id,
                                                                label: "Opción nueva",
                                                                value: id,
                                                            };
                                                            newFieldOption.$el = jQuery("<div />", {
                                                                "class": "field-".concat(field.type).concat("-item"),
                                                                html: [
                                                                    jQuery("<div />", {
                                                                        "class": "form-check",
                                                                        html: [
                                                                            jQuery("<input />", {
                                                                                id: newFieldOption.id,
                                                                                attr: {
                                                                                    name: "field-".concat(field.type).concat("-").concat(field.id),
                                                                                    type: field.type === "multiple" ? "checkbox" : "radio",
                                                                                    value: newFieldOption.value,
                                                                                },
                                                                                "class": "form-check-input",
                                                                            }),
                                                                            jQuery("<label />", {
                                                                                attr: {
                                                                                    contenteditable: true,
                                                                                    for: newFieldOption.id,
                                                                                },
                                                                                "class": "label-content-editable form-check-label",
                                                                                html: newFieldOption.label,
                                                                                click: function (event) {
                                                                                    event.preventDefault();
                                                                                    jQuery(this).focus();
                                                                                },
                                                                                focus: function () {
                                                                                    jQuery(this).selText();
                                                                                    jQuery(this).data('before', jQuery(this).html());
                                                                                },
                                                                                blur: function () {
                                                                                    if (jQuery(this).data('before') !== jQuery(this).html()) {
                                                                                        jQuery(this).data('before', jQuery(this).html());
                                                                                        jQuery(this).trigger('change');
                                                                                    }
                                                                                },
                                                                                change: function () {
                                                                                    var optionSelected = field.options.findIndex(fieldOption => fieldOption.id === newFieldOption.id);
                                                                                    field.options[optionSelected].label = jQuery(this).html();
                                                                                }
                                                                            }),
                                                                        ],
                                                                    }),
                                                                    jQuery("<i />", {
                                                                        "class": "fas fa-minus-circle",
                                                                        click: function (event) {
                                                                            var optionSelected = field.options.findIndex(fieldOption => fieldOption.id === newFieldOption.id);
                                                                            field.options[optionSelected].$el.remove();
                                                                            field.options.splice(optionSelected, 1);
                                                                        },
                                                                    }),
                                                                ],
                                                            });
                                                            field.options.push(newFieldOption);
                                                            field.$options.append(newFieldOption.$el);
                                                            newFieldOption.$el.find("label").trigger("click");
                                                        },
                                                    }),
                                                }),
                                            ],
                                        })
                                    }
                                    return null;
                                })(),
                                optionsContainer = jQuery("<div />", {
                                    "class": "field-setup",
                                    "css": {
                                        display: "none",
                                    },
                                    html: [
                                        jQuery("<div />", {
                                            "class": "form-group",
                                            html: [
                                                jQuery("<label />", {
                                                    html: "Descripción",
                                                }),
                                                inputInfo = jQuery("<input />", {
                                                    "class": "form-control",
                                                    value: field.info || null,
                                                    attr: {
                                                        placeholder: "Descripción de la pregunta",
                                                    }
                                                }),
                                            ],
                                        }),
                                        jQuery("<div />", {
                                            "class": "form-group",
                                            html: [
                                                jQuery("<label />", {
                                                    html: "Alias interno",
                                                }),
                                                inputTitle = jQuery("<input />", {
                                                    "class": "form-control",
                                                    attr: {
                                                        value: field.title || null,
                                                        placeholder: "Introduzca el alias interno",
                                                    }
                                                }),
                                            ],
                                        }),
                                        jQuery("<div />", {
                                            "class": "form-group",
                                            html: [
                                                jQuery("<label />", {
                                                    html: "Contenido de ejemplo",
                                                }),
                                                inputPlaceholder = jQuery("<input />", {
                                                    "class": "form-control",
                                                    attr: {
                                                        value: field.placeholder || null,
                                                        placeholder: "Introduzca un ejemplo o instrucción",
                                                    }
                                                }),
                                            ],
                                        }),
                                    ],
                                })
                            ]
                        }
                    })(),
                }),
                jQuery("<div />", { /* card-footer */
                    "class": "card-footer",
                    html: jQuery("<div />", {
                        "class": "field-tools",
                        html: [
                            (() => { /* Clone button */
                                return jQuery("<a />", {
                                    html: "<i class=\"far fa-copy d-none\"></i>",
                                });
                            })(),
                            (() => { /* Delete button */
                                return jQuery("<a />", {
                                    html: "<i class=\"far fa-trash-alt\"></i>",
                                    click: function () {
                                        var modal = makeModal({
                                            title: "Eliminar elemento",
                                            mainContent: "¿Seguro desea eliminar este elemeto?<br>Al eliminar este campo las respuestas a esta pregunta no estaran disponibles en tus registros.",
                                            "class-background": "bg-danger",
                                            footerContent: [
                                                jQuery("<button />", {
                                                    class: "btn btn-outline-light",
                                                    attr: {
                                                        type: "button",
                                                        "data-dismiss": "modal",
                                                    },
                                                    html: "Cancelar",
                                                }),
                                                jQuery("<button />", {
                                                    class: "btn btn-outline-light",
                                                    attr: {
                                                        type: "button",
                                                    },
                                                    html: "Aceptar",
                                                    click: function (e) {
                                                        e.preventDefault();
                                                        var fieldSelected = Controls.fields.findIndex(element => element.id === field.id);
                                                        Controls.fields[fieldSelected].$el.remove();
                                                        Controls.fields.splice(fieldSelected, 1);
                                                        if (Controls.fields.length === 0) {
                                                            jQuery(".forms-initial-message").show();
                                                        }
                                                        modal.modal("hide");
                                                    },
                                                }),
                                            ],
                                        });
                                    },
                                });
                            })(),
                            (() => { /* Separator */
                                if (field.type !== "image") {
                                    return jQuery("<div />", {
                                        "class": "sep",
                                    });
                                }
                            })(),
                            (() => { /* Heading selector */
                                if (field.type === "title") {
                                    field.heading = field.heading || "H1";
                                    return field.$heading = jQuery("<div />", {
                                        attr: {
                                            "data-toggle": "buttons",
                                        },
                                        "class": "btn-group btn-group-toggle",
                                        html: [
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.heading === "H1" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.heading === "H1" ? "checked" : null,
                                                            value: "H1",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "H1",
                                                ]
                                            }),
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.heading === "H2" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.heading === "H2" ? "checked" : null,
                                                            value: "H2",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "H2",
                                                ]
                                            }),
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.heading === "H3" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.heading === "H3" ? "checked" : null,
                                                            value: "H3",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "H3",
                                                ]
                                            }),
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.heading === "H4" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.heading === "H4" ? "checked" : null,
                                                            value: "H4",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "H4",
                                                ]
                                            }),
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.heading === "H5" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.heading === "H5" ? "checked" : null,
                                                            value: "H5",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "H5",
                                                ]
                                            }),
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.heading === "H6" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.heading === "H6" ? "checked" : null,
                                                            value: "H6",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "H6",
                                                ]
                                            }),
                                        ],
                                    });
                                }
                            })(),
                            (() => { /* Font styles selector */
                                if (field.type === "paragraph") {
                                    field.font_bold = field.font_bold || "false";
                                    field.font_italic = field.font_italic || "false";
                                    field.font_color = field.font_color || "black";
                                    return jQuery("<div />", {
                                        "class": "form-group m-0",
                                        html: [
                                            field.$font_color = jQuery("<label />", {
                                                attr: {
                                                    for: field.id.concat("_font_color")
                                                },
                                                css: {
                                                    "color": field.font_color,
                                                    "padding-top": "9px",
                                                    "padding-bottom": "9px",
                                                },
                                                "class": "btn btn-default m-0",
                                                html: jQuery("<i />", {
                                                    "class": "fas fa-font",
                                                })
                                            }).spectrum({
                                                color: field.font_color,
                                                showInitial: false,
                                                showInput: true,
                                                hideAfterPaletteSelect: true,
                                                change: function (color) {
                                                    field.font_color = color.toHexString();
                                                    field.$font_color.css("color", color.toHexString());
                                                },
                                            }),
                                            field.$font_bold = jQuery("<input />", {
                                                id: field.id.concat("_font_bold"),
                                                "class": "btn-check custom-checkbox",
                                                attr: field.font_bold == "true" ? {
                                                    checked: "checked",
                                                    type: "checkbox",
                                                } : {
                                                    type: "checkbox",
                                                },
                                                click: function (e) {
                                                    field.font_bold = jQuery(this).prop('checked') ? "true" : "false";
                                                }
                                            }),
                                            jQuery("<label />", {
                                                attr: {
                                                    for: field.id.concat("_font_bold")
                                                },
                                                css: {
                                                    "padding-top": "9px",
                                                    "padding-bottom": "9px",
                                                },
                                                "class": "btn btn-default m-0 ml-1",
                                                html: jQuery("<i />", {
                                                    "class": "fas fa-bold",
                                                })
                                            }),
                                            field.$font_italic = jQuery("<input />", {
                                                id: field.id.concat("_font_italic"),
                                                "class": "btn-check custom-checkbox",
                                                attr: field.font_italic == "true" ? {
                                                    checked: "checked",
                                                    type: "checkbox",
                                                } : {
                                                    type: "checkbox",
                                                },
                                                click: function (e) {
                                                    field.font_italic = jQuery(this).prop('checked') ? "true" : "false";
                                                }
                                            }),
                                            jQuery("<label />", {
                                                attr: {
                                                    for: field.id.concat("_font_italic")
                                                },
                                                css: {
                                                    "padding-top": "9px",
                                                    "padding-bottom": "9px",
                                                },
                                                "class": "btn btn-default m-0 ml-1",
                                                html: jQuery("<i />", {
                                                    "class": "fas fa-italic",
                                                })
                                            }),
                                        ],
                                    });
                                }
                            })(),
                            (() => { /* Font size selector */
                                if (field.type === "paragraph") {
                                    field.font_size = field.font_size || "16";
                                    return field.$font_size = jQuery("<select />", {
                                        "class": "custom-select",
                                        css: {
                                            "width": "100px",
                                            "max-width": "100px",
                                            "height": "44px",
                                        },
                                        html: (() => {
                                            var options = [];
                                            for (let i = 16; i < 33; i++) {
                                                options.push(jQuery("<option />", {
                                                    attr: (() => {
                                                        return i.toString() == field.font_size ? {
                                                            "selected": "selected",
                                                        } : {};
                                                    })(),
                                                    value: i.toString(),
                                                    html: i.toString().concat("px"),
                                                }));
                                            }
                                            return options;
                                        })(),
                                    });
                                }
                            })(),
                            (() => { /* Color Light-Dark selector */
                                if (field.type === "title" || field.type === "paragraph") { //verificar que implica quitarlo en este momento para paragraph
                                    field.color = field.color || "light";
                                    return field.$color = jQuery("<div />", {
                                        attr: {
                                            "data-toggle": "buttons",
                                        },
                                        "class": "btn-group btn-group-toggle ".concat(field.type === "paragraph" ? "d-none" : ""),
                                        html: [
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.color === "light" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.color === "light" ? "checked" : null,
                                                            value: "light",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "Claro",
                                                ]
                                            }),
                                            jQuery("<label />", {
                                                "class": "btn btn-secondary ".concat(field.color === "dark" ? "active" : ""),
                                                html: [
                                                    jQuery("<input />", {
                                                        attr: {
                                                            type: "radio",
                                                            autocomplete: "off",
                                                            checked: field.color === "dark" ? "checked" : null,
                                                            value: "dark",
                                                        },
                                                        "class": "toggle",
                                                    }),
                                                    "Obscuro",
                                                ]
                                            }),
                                        ],
                                    });
                                }
                            })(),
                            (() => { /* visible on datatables selector */
                                if (field.type !== "image" && field.type !== "title" && field.type !== "paragraph") {
                                    return jQuery("<div />", {
                                        "class": "mr-2 custom-control custom-switch custom-switch-off-danger custom-switch-on-success d-flex align-content-center align-items-center justify-content-center",
                                        html: [
                                            inputVisible = jQuery("<input />", {
                                                id: "chk-visible".concat(field.id),
                                                attr: {
                                                    checked: field.visible === 'true' ? "checked" : null,
                                                    type: "checkbox",
                                                },
                                                "class": "custom-control-input",
                                            }),
                                            jQuery("<label />", {
                                                attr: {
                                                    for: "chk-visible".concat(field.id),
                                                },
                                                "class": "custom-control-label",
                                                html: "Visible en datos",
                                            }),
                                        ],
                                    });
                                }
                            })(),
                            (() => { /* Required selector */
                                if (field.type !== "image" && field.type !== "title" && field.type !== "paragraph") {
                                    return jQuery("<div />", {
                                        "class": "custom-control custom-switch custom-switch-off-danger custom-switch-on-success d-flex align-content-center align-items-center justify-content-center",
                                        html: [
                                            inputRequired = jQuery("<input />", {
                                                id: "chk-required".concat(field.id),
                                                attr: {
                                                    checked: field.required === 'true' ? "checked" : null,
                                                    type: "checkbox",
                                                },
                                                "class": "custom-control-input",
                                            }),
                                            jQuery("<label />", {
                                                attr: {
                                                    for: "chk-required".concat(field.id),
                                                },
                                                "class": "custom-control-label",
                                                html: "Requerido",
                                            }),
                                        ],
                                    });
                                }
                            })(),
                            (() => { /* Avanced settings */
                                if (field.type !== "image" && field.type !== "title" && field.type !== "paragraph") {
                                    return jQuery("<a />", {
                                        html: "<i class=\"fas fa-ellipsis-v\"></i>",
                                        click: function (e) {
                                            optionsContainer.toggle("fast");
                                        },
                                    });
                                }
                            })(),
                        ]
                    }),
                }),
            ],
        }).appendTo(controlsContainer);

        /**
         * Optimizar retorno de objeto para no reescribir tanto codigo.
         * @description La mejor opcion es estructurar la variable field desde el inicio 
         * y devolverla a ella como objeto
         * @deprecated
         */
        if (field.type === "title") {
            return {
                $el: $el,
                id: field.id,
                type: field.type,
                title: {
                    $el: field.$title,
                    val: function (value = null) { return (value !== null) ? field.$title.val(value) : field.$title.val(); },
                },
                heading: {
                    $el: field.$heading,
                    size: function () {
                        return field.$heading.find(".active").find('input:radio').val();
                    },
                },
                color: function () {
                    return field.$color.find(".active").find('input:radio').val();
                },
            };
        }
        if (field.type === "paragraph") {
            return {
                $el: $el,
                id: field.id,
                type: field.type,
                paragraph: {
                    $el: field.$paragraph,
                    val: function (value = null) { return (value !== null) ? field.$paragraph.val(value) : field.$paragraph.val(); },
                },
                font_size: {
                    $el: field.$font_size,
                    val: function () {
                        return field.$font_size.val();
                    },
                },
                font_color: {
                    $el: field.$font_color,
                    val: function () {
                        return field.$font_color.css("color");
                    },
                },
                font_bold: {
                    $el: field.$font_bold,
                    val: function () {
                        return field.$font_bold.prop('checked') ? "true" : "false";
                    },
                },
                font_italic: {
                    $el: field.$font_italic,
                    val: function () {
                        return field.$font_italic.prop('checked') ? "true" : "false";
                    },
                },
                color: function () {
                    return field.$color.find(".active").find('input:radio').val();
                },
            };
        }
        else if (field.type === "image") {
            return {
                $el: $el,
                id: field.id,
                type: field.type,
                $image: field.$image,
                image: field.image,
            };
        }
        else if (field.type === "single" || field.type === "select" || field.type === "multiple") {
            return {
                $el: $el,
                id: field.id,
                type: field.type,
                hide: field.hide,
                delete: field.delete,
                options: field.options || null,
                required: {
                    $el: inputRequired,
                    checked: function () {
                        return inputRequired.is(":checked");
                    }
                },
                visible: {
                    $el: inputVisible,
                    checked: function () {
                        return inputVisible.is(":checked");
                    }
                },
                question: {
                    $el: inputQuestion,
                    val: function (value = null) { return (value !== null) ? inputQuestion.val(value) : inputQuestion.val(); },
                },
                info: {
                    $el: inputInfo,
                    val: function (value = null) { return (value !== null) ? inputInfo.val(value) : inputInfo.val(); },
                },
                title: {
                    $el: inputTitle,
                    val: function (value = null) { return (value !== null) ? inputTitle.val(value) : inputTitle.val(); },
                },
                placeholder: {
                    $el: inputPlaceholder,
                    val: function (value = null) { return (value !== null) ? inputPlaceholder.val(value) : inputPlaceholder.val(); },
                },
            };
        }
        else {
            return {
                $el: $el,
                id: field.id,
                type: field.type,
                hide: field.hide,
                delete: field.delete,
                required: {
                    $el: inputRequired,
                    checked: function () {
                        return inputRequired.is(":checked");
                    }
                },
                visible: {
                    $el: inputVisible,
                    checked: function () {
                        return inputVisible.is(":checked");
                    }
                },
                question: {
                    $el: inputQuestion,
                    val: function (value = null) { return (value !== null) ? inputQuestion.val(value) : inputQuestion.val(); },
                },
                info: {
                    $el: inputInfo,
                    val: function (value = null) { return (value !== null) ? inputInfo.val(value) : inputInfo.val(); },
                },
                title: {
                    $el: inputTitle,
                    val: function (value = null) { return (value !== null) ? inputTitle.val(value) : inputTitle.val(); },
                },
                placeholder: {
                    $el: inputPlaceholder,
                    val: function (value = null) { return (value !== null) ? inputPlaceholder.val(value) : inputPlaceholder.val(); },
                },
            };
        }


    }
    function initControls() {
        return {
            fields: (function () {
                var tmpFields = [];
                Settings.fields = Settings.fields || [];
                jQuery.each(Settings.fields, function (index, field) {
                    tmpFields.push(makeField(field));
                });
                return tmpFields;
            })(),
            identity: (function () {
                var inputName = null,
                    inputInfo = null,
                    colorName = 'black',
                    colorInfo = 'black';
                Settings.identity = Settings.identity || {};
                controlsInfo.html([
                    jQuery("<div />", {
                        "class": "form-group mb-0",
                        html: [
                            jQuery("<label />", {
                                attr: {
                                    form: "name",
                                },
                                html: "<h3 class=\"card-title small\"><i class=\"far fa-file-alt mr-2\"></i>Identificación del DataForm<i class=\"ml-2 fas fa-info-circle\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Identificación del DataForm: este nommbre identifica a tu DataForm en el listado &#34;Mis DataForms&#34;.\"></i></h3>",
                            }),
                            inputName = jQuery("<input />", {
                                id: "name",
                                "class": "form-control",
                                attr: {
                                    name: "name",
                                    type: "text",
                                    value: Settings.identity.name || null,
                                    placeholder: "Nombre de tu DataForm",
                                },
                            }),
                        ],
                    }),
                    jQuery("<div />", {
                        "class": "form-group d-none",
                        html: [
                            jQuery("<label />", {
                                attr: {
                                    form: "info",
                                },
                                html: "Descripción",
                            }),
                            inputInfo = jQuery("<input />", {
                                id: "info",
                                "class": "form-control",
                                attr: {
                                    name: "info",
                                    type: "text",
                                    value: Settings.identity.info || null,
                                    placeholder: "Descripción de tu DataForm",
                                },
                            }),
                        ],
                    }),
                ]);
                return {
                    name: {
                        $el: inputName,
                        val: function (value = null) { return (value !== null) ? inputName.val(value) : inputName.val(); },
                    },
                    info: {
                        $el: inputInfo,
                        val: function (value = null) { return (value !== null) ? inputInfo.val(value) : inputInfo.val(); },
                    },
                }
            })(),
            constructors: {
                title: jQuery("<a />", {
                    "class": "title btn btn-default btn-app",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-heading\"></i>Título",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "title" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);

                    },
                }).appendTo(controlsConstructorContainer),
                paragraph: jQuery("<a />", {
                    "class": "paragraph btn btn-default btn-app",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-paragraph\"></i>Párrafo",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "paragraph" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                input: jQuery("<a />", {
                    "class": "text btn btn-default btn-app btn-constructor-input",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-equals\"></i><p class=\"mb-0\">Respuesta corta</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({
                            type: "input",
                        });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                textarea: jQuery("<a />", {
                    "class": "textarea btn btn-default btn-app btn-constructor-textarea",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-align-justify\"></i><p class=\"mb-0\">Respuesta larga</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "textarea" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                tel: jQuery("<a />", {
                    "class": "tel btn btn-default btn-app btn-constructor-tel",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-phone\"></i><p class=\"mb-0\">Teléfono</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "tel" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                email: jQuery("<a />", {
                    "class": "email btn btn-default btn-app btn-constructor-email",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-envelope\"></i><p class=\"mb-0\">Email</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "email" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                single: jQuery("<a />", {
                    "class": "email btn btn-default btn-app btn-constructor-single",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-check-circle\"></i><p class=\"mb-0\">Seleción simple</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "single" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                select: jQuery("<a />", {
                    "class": "email btn btn-default btn-app btn-constructor-select",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-caret-square-down\"></i><p class=\"mb-0\">Seleción simple (Dropdown)</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "select" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                multiple: jQuery("<a />", {
                    "class": "email btn btn-default btn-app btn-constructor-multiple",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-check-square\"></i><p class=\"mb-0\">Seleción multiple</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "multiple" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        newField.$el.find('input[type="text"]').focus();
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                image: jQuery("<a />", { //Images factory button
                    "class": "email btn btn-default btn-app btn-constructor-image",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"far fa-image\"></i><p class=\"mb-0\">Imágen</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "image" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
                video: jQuery("<a />", { //Videos factory button
                    "class": "email btn btn-default btn-app btn-constructor-video",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"far fa-image\"></i><p class=\"mb-0\">Vídeos</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        Swal.fire({
                            title: 'Próximamente',
                            text: 'Funcionalidad aun en desarrollo.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        return false;

                        Controls.fields.push(
                            makeField({
                                type: "video",
                            })
                        );
                    },
                }).appendTo(controlsConstructorContainer),
                file: jQuery("<a />", { //Files factory button
                    "class": "email btn btn-default btn-app btn-constructor-file",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"fas fa-cloud-upload-alt\"></i><p class=\"mb-0\">Archivos</p>",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").not(".collapsed-card").find(".btn-tool").trigger("click");
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        Swal.fire({
                            title: 'Próximamente',
                            text: 'Funcionalidad aun en desarrollo.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        return false;

                        Controls.fields.push(
                            makeField({
                                type: "video",
                            })
                        );
                    },
                }).appendTo(controlsConstructorContainer),
                date: jQuery("<a />", { //Dates factory button
                    "class": "email btn btn-default btn-app",
                    attr: {
                        href: "#",
                    },
                    html: "<i class=\"far fa-calendar-alt\"></i>Fecha",
                    click: function (e) {
                        e.preventDefault();
                        jQuery(controlsContainer).children(".selected").removeClass("selected");
                        var newField = makeField({ type: "date" });
                        Controls.fields.push(newField);
                        newField.$el.addClass("selected");
                        newField.$el.find(".btn-tool").trigger("click");
                        $("html, body").animate({
                            scrollTop: newField.$el.offset().top,
                        }, 500);
                    },
                }).appendTo(controlsConstructorContainer),
            },
            status: (function () {
                var tmpStatus = [];
                var defaults = {
                    nuevo: {
                        id: 'uid-default-001',
                        slug: "nuevo",
                        name: "Nuevo",
                        initial: "N",
                        color: "white",
                        bgcolor: "gray",
                        default: true,
                    },
                };
                defaults = Settings.status || defaults;

                var itemsContainer = jQuery("<ul />", {
                    "class": "list-status",
                    html: (function () {
                        var $listStatus = [];
                        jQuery.each(defaults, function (index, item) {

                            /**
                             * Patch for older status version
                             */
                            if (item.id === 'uid-default-001') {
                                item.initial = 'N';
                                item.name = 'Nuevo';
                                item.color = 'white';
                                item.bgcolor = 'gray';
                            }
                            else if (item.id === 'uid-default-002') {
                                item.default = false;
                            }

                            $listStatus.push(
                                item.$el = jQuery("<li />", {
                                    id: item.id,
                                    "class": "list-item-status",
                                    html: [
                                        jQuery("<div />", {
                                            "class": "item-icon",
                                            css: {
                                                "color": item.color,
                                                "background-color": item.bgcolor,
                                            },
                                            html: item.initial,
                                        }),
                                        jQuery("<div />", {
                                            "class": "item-name",
                                            html: item.name,
                                        }),
                                        (function () {
                                            if (item.default === true || item.default == "true") return null;
                                            return jQuery("<div />", {
                                                "class": "item-tools",
                                                html: [
                                                    jQuery("<i />", {
                                                        "class": "fas fa-edit mr-2",
                                                        click: function (event) {
                                                            var statusSelected = Controls.status.items.findIndex(element => element.id === item.id);
                                                            var status = {
                                                                $color: null,
                                                                $bgcolor: null,
                                                                $name: null,
                                                                $initials: null,
                                                            }
                                                            var modal = makeModal({
                                                                title: "Editar estatus",
                                                                mainContent: [
                                                                    jQuery("<div />", {
                                                                        "class": "form-group",
                                                                        html: [
                                                                            jQuery("<label />", {
                                                                                attr: {
                                                                                    for: "new-status-color"
                                                                                },
                                                                                html: "Color de fuente",
                                                                            }),
                                                                            status.$color = jQuery("<input />", {
                                                                                attr: {
                                                                                    value: Controls.status.items[statusSelected].color,
                                                                                },
                                                                                "class": "form-control",
                                                                            }).spectrum({
                                                                                showInput: true,
                                                                                type: "text",
                                                                                preferredFormat: "rgb",
                                                                            })
                                                                        ],
                                                                    }),
                                                                    jQuery("<div />", {
                                                                        "class": "form-group",
                                                                        html: [
                                                                            jQuery("<label />", {
                                                                                attr: {
                                                                                    for: "new-status-color"
                                                                                },
                                                                                html: "Color de fondo",
                                                                            }),
                                                                            status.$bgcolor = jQuery("<input />", {
                                                                                attr: {
                                                                                    value: Controls.status.items[statusSelected].bgcolor,
                                                                                },
                                                                                "class": "form-control",
                                                                            }).spectrum({
                                                                                showInput: true,
                                                                                type: "text",
                                                                                preferredFormat: "rgb",
                                                                            })
                                                                        ],
                                                                    }),
                                                                    jQuery("<div />", {
                                                                        "class": "form-group",
                                                                        html: [
                                                                            jQuery("<label />", {
                                                                                attr: {
                                                                                    for: "new-status-initials"
                                                                                },
                                                                                html: "Iniciales",
                                                                            }),
                                                                            status.$initials = jQuery("<input />", {
                                                                                id: "new-status-initials",
                                                                                attr: {
                                                                                    type: "text",
                                                                                    name: "new-status-initials",
                                                                                    placeholder: "Escriba las iniciales del nuevo estatus",
                                                                                    value: Controls.status.items[statusSelected].initial,
                                                                                },
                                                                                "class": "form-control",
                                                                            }),
                                                                        ],

                                                                    }),
                                                                    jQuery("<div />", {
                                                                        "class": "form-group",
                                                                        html: [
                                                                            jQuery("<label />", {
                                                                                attr: {
                                                                                    for: "new-status-name"
                                                                                },
                                                                                html: "Nombre",
                                                                            }),
                                                                            status.$name = jQuery("<input />", {
                                                                                id: "new-status-name",
                                                                                attr: {
                                                                                    type: "text",
                                                                                    name: "new-status-name",
                                                                                    placeholder: "Escriba el nombre del nuevo estatus",
                                                                                    value: Controls.status.items[statusSelected].name,
                                                                                },
                                                                                "class": "form-control",
                                                                            }),
                                                                        ],

                                                                    }),
                                                                ],
                                                                handlerAccept: function (event) {
                                                                    Controls.status.items[statusSelected].initial = status.$initials.val();
                                                                    Controls.status.items[statusSelected].name = status.$name.val();
                                                                    Controls.status.items[statusSelected].color = status.$color.spectrum('get').toHexString();
                                                                    Controls.status.items[statusSelected].bgcolor = status.$bgcolor.spectrum('get').toHexString();

                                                                    item.$el.find(".item-icon").css("color", status.$color.spectrum('get').toHexString());
                                                                    item.$el.find(".item-icon").css("background-color", status.$bgcolor.spectrum('get').toHexString());
                                                                    item.$el.find(".item-icon").html(status.$initials.val());
                                                                    item.$el.find(".item-name").html(status.$name.val());

                                                                    modal.modal('hide');
                                                                },
                                                            });
                                                            modal.modal("show");
                                                        },
                                                    }),
                                                    jQuery("<i />", {
                                                        "class": "fas fa-trash",
                                                        click: function (event) {
                                                            var statusSelected = Controls.status.items.findIndex(element => element.id === item.id);
                                                            Controls.status.items.splice(statusSelected, 1);
                                                            item.$el.remove();
                                                        },
                                                    })
                                                ],
                                            });
                                        })(),
                                    ],
                                })
                            );
                            tmpStatus.push(item);
                        });
                        return $listStatus;
                    })(),
                })
                    .sortable({
                        stop: function (event, ui) {
                            var sortElements = $(this).sortable("toArray");
                            var tempItems = [];
                            $.each(sortElements, function (index, value) {
                                var tmpItem = Controls.status.items.filter(tmpItem => tmpItem.id == value)[0];
                                tempItems.push(tmpItem);
                            });
                            Controls.status.items = $.merge([], tempItems);
                        },
                    })
                    .appendTo(".controls-status");

                jQuery(".controls-status").append(jQuery("<a />", {
                    "class": 'btn btn-block btn-outline-light',
                    html: '<i class="fas fa-plus-circle"></i>',
                    click: function (event) {
                        var status = {
                            $color: null,
                            $bgcolor: null,
                            $name: null,
                            $initials: null,
                        }
                        var modal = makeModal({
                            title: "Nuevo estatus",
                            mainContent: [
                                jQuery("<div />", { /* Spectrum font color */
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            attr: {
                                                for: "new-status-color"
                                            },
                                            html: "Color de fuente",
                                        }),
                                        status.$color = jQuery("<input />", {
                                            attr: {
                                                value: "white",
                                            },
                                            "class": "form-control",
                                        }).spectrum({
                                            hideAfterPaletteSelect: true,
                                            showInput: true,
                                            type: "text",
                                            preferredFormat: "rgb",
                                        })
                                    ],
                                }),
                                jQuery("<div />", { /* Spectrum background color */
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            attr: {
                                                for: "new-status-color"
                                            },
                                            html: "Color de fondo",
                                        }),
                                        status.$bgcolor = jQuery("<input />", {
                                            attr: {
                                                value: "orange",
                                            },
                                            "class": "form-control",
                                        }).spectrum({
                                            hideAfterPaletteSelect: true,
                                            showInput: true,
                                            type: "text",
                                            preferredFormat: "rgb",
                                        })
                                    ],
                                }),
                                jQuery("<div />", { /* Initials */
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            attr: {
                                                for: "new-status-initials"
                                            },
                                            html: "Iniciales",
                                        }),
                                        status.$initials = jQuery("<input />", {
                                            id: "new-status-initials",
                                            attr: {
                                                type: "text",
                                                name: "new-status-initials",
                                                placeholder: "Escriba las iniciales del nuevo estatus",
                                            },
                                            "class": "form-control",
                                        }),
                                    ],

                                }),
                                jQuery("<div />", { /* Name */
                                    "class": "form-group",
                                    html: [
                                        jQuery("<label />", {
                                            attr: {
                                                for: "new-status-name"
                                            },
                                            html: "Nombre",
                                        }),
                                        status.$name = jQuery("<input />", {
                                            id: "new-status-name",
                                            attr: {
                                                type: "text",
                                                name: "new-status-name",
                                                placeholder: "Escriba el nombre del nuevo estatus",
                                            },
                                            "class": "form-control",
                                        }),
                                    ],

                                }),
                            ],
                            handlerAccept: function (event) {
                                var uid = uniqid();
                                let $newStatus = jQuery("<li />", { /* New item status */
                                    id: uid,
                                    "class": "list-item-status",
                                    html: [
                                        jQuery("<div />", { /* Icon */
                                            "class": "item-icon",
                                            css: {
                                                "color": status.$color.spectrum('get').toHexString(),
                                                "background-color": status.$bgcolor.spectrum('get').toHexString(),
                                            },
                                            html: status.$initials.val() ? status.$initials.val() : "ND",
                                        }),
                                        jQuery("<div />", { /* Name */
                                            "class": "item-name",
                                            html: status.$name.val() ? status.$name.val() : "NO DEFINIDO",
                                        }),
                                        jQuery("<div />", { /* Tools */
                                            "class": "item-tools",
                                            html: [
                                                jQuery("<i />", {
                                                    "class": "fas fa-edit mr-2",
                                                    click: function (event) {
                                                        var statusSelected = Controls.status.items.findIndex(element => element.id === uid);
                                                        var status = {
                                                            $color: null,
                                                            $bgcolor: null,
                                                            $name: null,
                                                            $initials: null,
                                                        }
                                                        let modal = makeModal({
                                                            title: "Editar estatus",
                                                            mainContent: [
                                                                jQuery("<div />", {
                                                                    "class": "form-group",
                                                                    html: [
                                                                        jQuery("<label />", {
                                                                            attr: {
                                                                                for: "new-status-color"
                                                                            },
                                                                            html: "Color de fuente",
                                                                        }),
                                                                        status.$color = jQuery("<input />", {
                                                                            attr: {
                                                                                value: Controls.status.items[statusSelected].color,
                                                                            },
                                                                            "class": "form-control",
                                                                        }).spectrum({
                                                                            hideAfterPaletteSelect: true,
                                                                            showInput: true,
                                                                            type: "text",
                                                                            preferredFormat: "rgb",
                                                                        })
                                                                    ],
                                                                }),
                                                                jQuery("<div />", {
                                                                    "class": "form-group",
                                                                    html: [
                                                                        jQuery("<label />", {
                                                                            attr: {
                                                                                for: "new-status-color"
                                                                            },
                                                                            html: "Color de fondo",
                                                                        }),
                                                                        status.$bgcolor = jQuery("<input />", {
                                                                            attr: {
                                                                                value: Controls.status.items[statusSelected].bgcolor,
                                                                            },
                                                                            "class": "form-control",
                                                                        }).spectrum({
                                                                            hideAfterPaletteSelect: true,
                                                                            showInput: true,
                                                                            type: "text",
                                                                            preferredFormat: "rgb",
                                                                        })
                                                                    ],
                                                                }),
                                                                jQuery("<div />", {
                                                                    "class": "form-group",
                                                                    html: [
                                                                        jQuery("<label />", {
                                                                            attr: {
                                                                                for: "new-status-initials"
                                                                            },
                                                                            html: "Iniciales",
                                                                        }),
                                                                        status.$initials = jQuery("<input />", {
                                                                            id: "new-status-initials",
                                                                            attr: {
                                                                                type: "text",
                                                                                name: "new-status-initials",
                                                                                placeholder: "Escriba las iniciales del nuevo estatus",
                                                                                value: Controls.status.items[statusSelected].initial,
                                                                            },
                                                                            "class": "form-control",
                                                                        }),
                                                                    ],

                                                                }),
                                                                jQuery("<div />", {
                                                                    "class": "form-group",
                                                                    html: [
                                                                        jQuery("<label />", {
                                                                            attr: {
                                                                                for: "new-status-name"
                                                                            },
                                                                            html: "Nombre",
                                                                        }),
                                                                        status.$name = jQuery("<input />", {
                                                                            id: "new-status-name",
                                                                            attr: {
                                                                                type: "text",
                                                                                name: "new-status-name",
                                                                                placeholder: "Escriba el nombre del nuevo estatus",
                                                                                value: Controls.status.items[statusSelected].name,
                                                                            },
                                                                            "class": "form-control",
                                                                        }),
                                                                    ],

                                                                }),
                                                            ],
                                                            handlerAccept: function (event) {
                                                                console.log(Controls);
                                                                console.log(statusSelected);
                                                                // return false;
                                                                Controls.status.items[statusSelected].initial = status.$initials.val();
                                                                Controls.status.items[statusSelected].name = status.$name.val();
                                                                Controls.status.items[statusSelected].color = status.$color.spectrum('get').toHexString();
                                                                Controls.status.items[statusSelected].bgcolor = status.$bgcolor.spectrum('get').toHexString();

                                                                $newStatus.find(".item-icon").css("color", status.$color.spectrum('get').toHexString());
                                                                $newStatus.find(".item-icon").css("background-color", status.$bgcolor.spectrum('get').toHexString());
                                                                $newStatus.find(".item-icon").html(status.$initials.val());
                                                                $newStatus.find(".item-name").html(status.$name.val());

                                                                modal.modal('hide');
                                                            },
                                                        });
                                                        modal.modal("show");
                                                    },
                                                }),
                                                jQuery("<i />", {
                                                    "class": "fas fa-trash",
                                                    click: function (event) {
                                                        var statusSelected = Controls.status.items.findIndex(element => element.id === uid);
                                                        Controls.status.items.splice(statusSelected, 1);
                                                        $newStatus.remove();
                                                    },
                                                }),
                                            ],
                                        }),
                                    ],
                                });
                                itemsContainer.append($newStatus);

                                Controls.status.items.push({
                                    id: uid,
                                    slug: uid,
                                    name: status.$name.val() ? status.$name.val() : "NO DEFINIDO",
                                    initial: status.$initials.val() ? status.$initials.val() : "ND",
                                    color: status.$color.spectrum('get').toHexString(),
                                    bgcolor: status.$bgcolor.spectrum('get').toHexString(),
                                    default: false,
                                });
                                modal.modal('hide');
                            },
                        });
                        modal.modal("show");
                    },
                }));
                return {
                    container: itemsContainer,
                    items: tmpStatus,
                };
            })(),
            design: (function () {
                var backgroundType = Settings.design.styles.page.backgroundType;
                var imageSrc = Settings.design.styles.page.imageSrc;
                var color = Settings.design.styles.page.color;
                var colors = Settings.design.styles.page.colors;

                var backgroundButtonsControllers = {
                    solid: {
                        $el: null,
                        color: color,
                    },
                    gradient: {
                        $el: null,
                        colors: colors,
                        gradientBox: null,
                    },
                    image: {
                        $el: null,
                        url: "",
                        input: null,
                        imagenSrc: imageSrc,
                        thumbnailPreview: null,
                    },
                };
                return {
                    $el: $el.find(".control-design").prepend(jQuery("<div />", {
                        id: "accordion",
                        html: [
                            jQuery("<div />", { /* Header fonts accordion */
                                "class": "card card-collapsed fonts-customize",
                                html: [
                                    jQuery("<div />", {
                                        id: "header-fonts-accordion",
                                        "class": "card-header p-2",
                                        html: [
                                            jQuery("<h5 />", {
                                                "class": "mb-0 d-flex align-content-center align-items-center justify-content-between",
                                                html: [
                                                    jQuery("<button />", {
                                                        attr: {
                                                            "data-toggle": "collapse",
                                                            "data-target": "#body-fonts-accordion",
                                                            "aria-expanded": "true",
                                                            "aria-controls": "body-fonts-accordion",
                                                        },
                                                        "class": "btn btn-accordion-collapse",
                                                        html: "<i class=\"fas fa-palette mr-2\"></i>Estilos de fuente",
                                                        click: function (e) {
                                                            jQuery(this).closest(".card").toggleClass("card-collapsed");
                                                        },
                                                    }),
                                                    jQuery("<i />", {
                                                        attr: {
                                                            "data-toggle": "collapse",
                                                            "data-target": "#body-fonts-accordion",
                                                            "aria-expanded": "true",
                                                            "aria-controls": "body-fonts-accordion",
                                                        },
                                                        css: {
                                                            cursor: "pointer",
                                                        },
                                                        "class": "fas fa-angle-down mr-2 collapsed",
                                                        click: function (e) {
                                                            jQuery(this).closest(".card").toggleClass("card-collapsed");
                                                        },
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    jQuery("<div />", {
                                        id: "body-fonts-accordion",
                                        attr: {
                                            "aria-labelledby": "header-fonts-accordion",
                                            "data-parent": "#accordion",
                                        },
                                        "class": "collapse",
                                        html: jQuery("<div />", {
                                            "class": "card-body",
                                            html: jQuery("<div />", {
                                                "class": "row row-font-styles",
                                                html: [
                                                    jQuery("<div />", { /* Nombre del formulario - deshabilitado */
                                                        "class": "col-12 d-none",
                                                        html: makeFontControl({
                                                            label: "Nombre del dataForm",
                                                            name: "name",
                                                            color: Settings.design.styles.fonts.name["color"],
                                                            bold: Settings.design.styles.fonts.name["font-weight"] === "bold" ? true : false,
                                                            italic: Settings.design.styles.fonts.name["font-style"] === "italic" ? true : false,
                                                            font: Settings.design.styles.fonts.name["font-family"],
                                                            bold_handler: function (event) {
                                                                Controls.design.styles.fonts.name["font-weight"] = jQuery(this).prop('checked') ? "bold" : "normal";
                                                            },
                                                            italic_handler: function (event) {
                                                                Controls.design.styles.fonts.name["font-style"] = jQuery(this).prop('checked') ? "italic" : "normal";
                                                            },
                                                            color_handler: function (color) {
                                                                Controls.design.styles.fonts.name.color = color.toHexString();
                                                                jQuery(this).css({
                                                                    "background-color": color.toHexString(),
                                                                });
                                                            },
                                                        }),
                                                    }),
                                                    jQuery("<div />", { /* Descripcion del formulario - deshabilitado */
                                                        "class": "col-12 d-none",
                                                        html: makeFontControl({
                                                            label: "Descripción del dataForm",
                                                            name: "info",
                                                            color: Settings.design.styles.fonts.info["color"],
                                                            bold: Settings.design.styles.fonts.info["font-weight"] === "bold" ? true : false,
                                                            italic: Settings.design.styles.fonts.info["font-style"] === "italic" ? true : false,
                                                            font: Settings.design.styles.fonts.info["font-family"],
                                                            bold_handler: function (event) {
                                                                Controls.design.styles.fonts.info["font-weight"] = jQuery(this).prop('checked') ? "bold" : "normal";
                                                            },
                                                            italic_handler: function (event) {
                                                                Controls.design.styles.fonts.info["font-style"] = jQuery(this).prop('checked') ? "italic" : "normal";
                                                            },
                                                            color_handler: function (color) {
                                                                Controls.design.styles.fonts.info.color = color.toHexString();
                                                                jQuery(this).css({
                                                                    "background-color": color.toHexString(),
                                                                });
                                                            },
                                                        }),
                                                    }),
                                                    jQuery("<div />", { /* Titulos */
                                                        "class": "col-12",
                                                        html: makeFontControl({
                                                            label: "Títulos",
                                                            name: "headers",
                                                            color: Settings.design.styles.fonts.headers["color"],
                                                            bold: Settings.design.styles.fonts.headers["font-weight"] === "bold" ? true : false,
                                                            italic: Settings.design.styles.fonts.headers["font-style"] === "italic" ? true : false,
                                                            font: Settings.design.styles.fonts.headers["font-family"],
                                                            bold_handler: function (event) {
                                                                Controls.design.styles.fonts.headers["font-weight"] = jQuery(this).prop('checked') ? "bold" : "normal";
                                                            },
                                                            italic_handler: function (event) {
                                                                Controls.design.styles.fonts.headers["font-style"] = jQuery(this).prop('checked') ? "italic" : "normal";
                                                            },
                                                            color_handler: function (color) {
                                                                Controls.design.styles.fonts.headers.color = color.toHexString();
                                                                jQuery(this).css({
                                                                    "background-color": color.toHexString(),
                                                                });
                                                            },
                                                        }),
                                                    }),
                                                    jQuery("<div />", { /* Texto global */
                                                        "class": "col-12",
                                                        html: makeFontControl({
                                                            label: "Texto global",
                                                            name: "base",
                                                            color: Settings.design.styles.fonts.base["color"],
                                                            bold: Settings.design.styles.fonts.base["font-weight"] === "bold" ? true : false,
                                                            italic: Settings.design.styles.fonts.base["font-style"] === "italic" ? true : false,
                                                            font: Settings.design.styles.fonts.base["font-family"],
                                                            bold_handler: function (event) {
                                                                Controls.design.styles.fonts.base["font-weight"] = jQuery(this).prop('checked') ? "bold" : "normal";
                                                            },
                                                            italic_handler: function (event) {
                                                                Controls.design.styles.fonts.base["font-style"] = jQuery(this).prop('checked') ? "italic" : "normal";
                                                            },
                                                            color_handler: function (color) {
                                                                Controls.design.styles.fonts.base.color = color.toHexString();
                                                                jQuery(this).css({
                                                                    "background-color": color.toHexString(),
                                                                });
                                                            },
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            jQuery("<div />", { /* Header buttons accordion */
                                "class": "card card-collapsed buttons-customize",
                                html: [
                                    jQuery("<div />", {
                                        id: "header-buttons-accordion",
                                        "class": "card-header p-2",
                                        html: [
                                            jQuery("<h5 />", {
                                                "class": "mb-0 d-flex align-content-center align-items-center justify-content-between",
                                                html: [
                                                    jQuery("<button />", {
                                                        attr: {
                                                            "data-toggle": "collapse",
                                                            "data-target": "#body-buttons-accordion",
                                                            "aria-expanded": "true",
                                                            "aria-controls": "body-buttons-accordion",
                                                        },
                                                        "class": "btn btn-accordion-collapse",
                                                        html: "<i class=\"fas fa-external-link-square-alt mr-2\"></i>Botones",
                                                        click: function (e) {
                                                            jQuery(this).closest(".card").toggleClass("card-collapsed");
                                                        },
                                                    }),
                                                    jQuery("<i />", {
                                                        attr: {
                                                            "data-toggle": "collapse",
                                                            "data-target": "#body-buttons-accordion",
                                                            "aria-expanded": "true",
                                                            "aria-controls": "body-buttons-accordion",
                                                        },
                                                        css: {
                                                            cursor: "pointer",
                                                        },
                                                        "class": "fas fa-angle-down mr-2 collapsed",
                                                        click: function (e) {
                                                            jQuery(this).closest(".card").toggleClass("card-collapsed");
                                                        },
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    jQuery("<div />", {
                                        id: "body-buttons-accordion",
                                        attr: {
                                            "aria-labelledby": "header-buttons-accordion",
                                            "data-parent": "#accordion",
                                        },
                                        "class": "collapse",
                                        html: jQuery("<div />", {
                                            "class": "card-body",
                                            html: jQuery("<div />", {
                                                "class": "row",
                                                html: [
                                                    jQuery("<div />", {
                                                        "class": "col-12",
                                                        html: jQuery("<div />", {
                                                            "class": "d-flex justify-content-between align-items-center align-content-center mb-2",
                                                            html: [
                                                                jQuery("<p />", {
                                                                    "class": "font-weight-bold mb-0",
                                                                    html: "Enviar",
                                                                }),
                                                                jQuery("<div />", {
                                                                    "class": "d-flex align-items-center align-content-center",
                                                                    html: [
                                                                        jQuery("<div />", {
                                                                            "class": "small mr-2",
                                                                            html: "Color de fondo",
                                                                        }),
                                                                        jQuery("<span />", {
                                                                            css: {
                                                                                "background-color": Settings.design.styles.buttons.send.bgcolor,
                                                                            },
                                                                            "class": "color-picker-spectrum",
                                                                            html: "",
                                                                        }).spectrum({
                                                                            showInput: true,
                                                                            change: function (color) {
                                                                                Controls.design.styles.buttons.send.bgcolor = color.toHexString();
                                                                                jQuery(this).css({
                                                                                    "background-color": color.toHexString(),
                                                                                });
                                                                            },
                                                                        }),
                                                                        jQuery("<div />", {
                                                                            "class": "small mr-2",
                                                                            html: "Color de texto",
                                                                        }),
                                                                        jQuery("<span />", {
                                                                            css: {
                                                                                "background-color": Settings.design.styles.buttons.send.color,
                                                                            },
                                                                            "class": "color-picker-spectrum mr-0",
                                                                            html: "",
                                                                        }).spectrum({
                                                                            showInput: true,
                                                                            change: function (color) {
                                                                                Controls.design.styles.buttons.send.color = color.toHexString();
                                                                                jQuery(this).css({
                                                                                    "background-color": color.toHexString(),
                                                                                });
                                                                            },
                                                                        }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                    jQuery("<div />", {
                                                        "class": "col-12",
                                                        html: jQuery("<div />", {
                                                            "class": "d-flex justify-content-between align-items-center align-content-center",
                                                            html: [
                                                                jQuery("<p />", {
                                                                    "class": "font-weight-bold mb-0",
                                                                    html: "Limpiar",
                                                                }),
                                                                jQuery("<div />", {
                                                                    "class": "d-flex align-items-center align-content-center",
                                                                    html: [
                                                                        jQuery("<div />", {
                                                                            "class": "small mr-2",
                                                                            html: "Color de fondo",
                                                                        }),
                                                                        jQuery("<span />", {
                                                                            css: {
                                                                                "background-color": Settings.design.styles.buttons.reset.bgcolor,
                                                                            },
                                                                            "class": "color-picker-spectrum",
                                                                            html: "",
                                                                        }).spectrum({
                                                                            showInput: true,
                                                                            change: function (color) {
                                                                                Controls.design.styles.buttons.reset.bgcolor = colorName = color.toHexString();
                                                                                jQuery(this).css({
                                                                                    "background-color": color.toHexString(),
                                                                                });
                                                                            },
                                                                        }),
                                                                        jQuery("<div />", {
                                                                            "class": "small mr-2",
                                                                            html: "Color de texto",
                                                                        }),
                                                                        jQuery("<span />", {
                                                                            css: {
                                                                                "background-color": Settings.design.styles.buttons.reset.color,
                                                                            },
                                                                            "class": "color-picker-spectrum  mr-0",
                                                                            html: "",
                                                                        }).spectrum({
                                                                            showInput: true,
                                                                            change: function (color) {
                                                                                Controls.design.styles.buttons.reset.color = colorName = color.toHexString();
                                                                                jQuery(this).css({
                                                                                    "background-color": color.toHexString(),
                                                                                });
                                                                            },
                                                                        }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            jQuery("<div />", { /* Header background accordion */
                                "class": "card card-collapsed background-customize",
                                html: [
                                    jQuery("<div />", {
                                        id: "header-background-accordion",
                                        "class": "card-header p-2",
                                        html: [
                                            jQuery("<h5 />", {
                                                "class": "mb-0 d-flex align-content-center align-items-center justify-content-between",
                                                html: [
                                                    jQuery("<button />", {
                                                        attr: {
                                                            "data-toggle": "collapse",
                                                            "data-target": "#body-background-accordion",
                                                            "aria-expanded": "true",
                                                            "aria-controls": "body-background-accordion",
                                                        },
                                                        "class": "btn btn-accordion-collapse",
                                                        html: "<i class=\"far fa-image mr-2\"></i>Fondo de página",
                                                        click: function (e) {
                                                            jQuery(this).closest(".card").toggleClass("card-collapsed");
                                                        },
                                                    }),
                                                    jQuery("<i />", {
                                                        attr: {
                                                            "data-toggle": "collapse",
                                                            "data-target": "#body-background-accordion",
                                                            "aria-expanded": "true",
                                                            "aria-controls": "body-background-accordion",
                                                        },
                                                        css: {
                                                            cursor: "pointer",
                                                        },
                                                        "class": "fas fa-angle-down mr-2 collapsed",
                                                        click: function (e) {
                                                            jQuery(this).closest(".card").toggleClass("card-collapsed");
                                                        },
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    jQuery("<div />", {
                                        id: "body-background-accordion",
                                        attr: {
                                            "aria-labelledby": "header-background-accordion",
                                            "data-parent": "#accordion",
                                        },
                                        "class": "collapse",
                                        html: jQuery("<div />", {
                                            "class": "card-body row",
                                            html: jQuery("<div />", {
                                                "class": "grid grid-type--card",
                                                html: [
                                                    backgroundButtonsControllers.solid.$el = jQuery("<label />", {
                                                        "class": "grid__item background-option solid ".concat(backgroundType == "solid" ? "active" : ""),
                                                        html: [
                                                            jQuery("<div />", {
                                                                "class": "grid__inner",
                                                                css: {
                                                                    "background-color": color,
                                                                },
                                                                html: jQuery("<div />", {
                                                                    "class": "button-tools",
                                                                    html: [
                                                                        jQuery("<a />", {
                                                                            attr: {
                                                                                href: "#",
                                                                            },
                                                                            "class": "check-icon",
                                                                            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 191.667 191.667" style="enable-background:new 0 0 191.667 191.667;" xml:space="preserve"><path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685 c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971 l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969 C156.146,65.765,156.146,74.362,150.862,79.646z"/><g></svg>',
                                                                        }),
                                                                        jQuery("<a />", {
                                                                            "class": "config-icon",
                                                                            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="585.283px" height="585.283px" viewBox="0 0 585.283 585.283" style="enable-background:new 0 0 585.283 585.283;"xml:space="preserve"><g><g><path d="M537.998,227.826h-20.963c-5.225,0-13.502-6.353-17.029-15.471c-1.242-3.213-2.576-6.432-3.963-9.569 c-3.953-8.938-2.596-19.278,1.096-22.962l14.838-14.819c18.441-18.443,18.441-48.443,0.006-66.879l-24.783-24.783 c-8.951-8.951-20.83-13.877-33.455-13.877s-24.504,4.927-33.451,13.877l-14.822,14.822c-2.158,2.157-6.531,3.498-11.414,3.498 c-3.957,0-8.064-0.851-11.564-2.399c-3.139-1.386-6.352-2.717-9.553-3.957c-9.123-3.528-15.479-11.809-15.479-17.032V47.292 C357.461,21.218,336.246,0,310.172,0h-35.049c-26.077,0-47.289,21.215-47.289,47.292v20.982c0,5.223-6.356,13.5-15.475,17.029 c-3.191,1.233-6.405,2.564-9.553,3.954c-3.5,1.548-7.613,2.399-11.573,2.399c-4.883,0-9.259-1.34-11.417-3.495l-14.829-14.823 c-8.938-8.938-20.82-13.865-33.452-13.865s-24.504,4.927-33.431,13.877L73.334,98.122c-18.437,18.437-18.437,48.437,0,66.873 l14.823,14.823c3.69,3.69,5.052,14.039,1.102,22.987c-1.383,3.136-2.714,6.349-3.951,9.553 c-3.525,9.116-11.805,15.468-17.035,15.468H47.297c-26.077,0-47.289,21.215-47.289,47.292v35.049 c0,26.074,21.215,47.289,47.289,47.289H68.27c5.227,0,13.51,6.352,17.032,15.469c1.236,3.201,2.567,6.414,3.95,9.549 c3.951,8.949,2.589,19.297-1.102,22.988l-14.823,14.822c-18.437,18.434-18.437,48.449-0.006,66.9l24.786,24.789 c8.935,8.932,20.808,13.854,33.437,13.854c12.628,0,24.501-4.918,33.437-13.854l14.832-14.842 c2.188-2.189,6.454-3.496,11.408-3.496c3.957,0,8.063,0.85,11.567,2.398c3.109,1.377,6.328,2.711,9.562,3.963 c9.122,3.527,15.475,11.805,15.475,17.029v20.963c0,26.074,21.215,47.293,47.289,47.293h35.05 c26.076,0,47.289-21.215,47.289-47.293v-20.963c0-5.225,6.352-13.502,15.467-17.023c3.201-1.236,6.414-2.566,9.551-3.953 c3.5-1.545,7.607-2.396,11.564-2.396c4.889,0,9.266,1.34,11.422,3.498l14.822,14.822c8.961,8.936,20.842,13.854,33.469,13.854 c1.367,0,2.75-0.062,4.111-0.182c17.268-1.5,32.502-16.805,40.686-25.027l1.035-1.037l12.391-12.391 c18.404-18.451,18.404-48.455,0.008-66.895l-14.832-14.832c-3.689-3.689-5.051-14.039-1.102-22.99 c1.391-3.145,2.719-6.357,3.951-9.549c3.525-9.117,11.803-15.469,17.025-15.469h20.965c26.078,0,47.289-21.215,47.289-47.293 v-35.045C585.287,249.041,564.072,227.826,537.998,227.826z M420.607,292.643c0,70.559-57.402,127.961-127.959,127.961 c-70.558,0-127.96-57.402-127.96-127.961c0-70.557,57.403-127.959,127.96-127.959 C363.205,164.683,420.607,222.085,420.607,292.643z"/></g></g></svg>',
                                                                        }).spectrum({
                                                                            showInput: true,
                                                                            change: function (color) {
                                                                                if (!color) return;
                                                                                backgroundButtonsControllers.solid.$el.find(".grid__inner").css({
                                                                                    "background-color": color.toHexString(),
                                                                                });
                                                                                backgroundButtonsControllers.solid.color = color.toHexString();
                                                                                Controls.design.styles.page.color = color.toHexString();
                                                                                Controls.design.styles.page.css["background-color"] = color.toHexString();
                                                                            },
                                                                        }),
                                                                    ],
                                                                }),
                                                            }),
                                                            jQuery("<span />", {
                                                                "class": "grid__title",
                                                                html: "Solido",
                                                            }),
                                                        ],
                                                        click: function () {
                                                            jQuery(".background-option").removeClass("active");
                                                            jQuery(this).addClass("active");
                                                            Controls.design.styles.page.backgroundType = "solid";
                                                            Controls.design.styles.page.color = backgroundButtonsControllers.solid.color;
                                                            Controls.design.styles.page.css = {
                                                                "background-image": "none",
                                                                "background-color": Controls.design.styles.page.backgroundButtonsControllers.solid.color || "rgb(28,55,90)",
                                                            };
                                                        },
                                                    }),
                                                    backgroundButtonsControllers.gradient.$el = jQuery("<label />", {
                                                        "class": "grid__item background-option gradient ".concat(backgroundType == "gradient" ? "active" : ""),
                                                        html: [
                                                            jQuery("<div />", {
                                                                "class": "grid__inner",
                                                                css: {
                                                                    "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                    "background-image": "linear-gradient(".concat(backgroundButtonsControllers.gradient.colors[0]).concat(" 0%, ").concat(backgroundButtonsControllers.gradient.colors[1]).concat(" 100%)"),
                                                                },
                                                                html: jQuery("<div />", {
                                                                    "class": "button-tools",
                                                                    html: [
                                                                        jQuery("<a />", {
                                                                            attr: {
                                                                                href: "#",
                                                                            },
                                                                            "class": "check-icon",
                                                                            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 191.667 191.667" style="enable-background:new 0 0 191.667 191.667;" xml:space="preserve"><path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685 c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971 l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969 C156.146,65.765,156.146,74.362,150.862,79.646z"/><g></svg>',
                                                                        }),
                                                                        jQuery("<a />", {
                                                                            "class": "config-icon",
                                                                            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="585.283px" height="585.283px" viewBox="0 0 585.283 585.283" style="enable-background:new 0 0 585.283 585.283;"xml:space="preserve"><g><g><path d="M537.998,227.826h-20.963c-5.225,0-13.502-6.353-17.029-15.471c-1.242-3.213-2.576-6.432-3.963-9.569 c-3.953-8.938-2.596-19.278,1.096-22.962l14.838-14.819c18.441-18.443,18.441-48.443,0.006-66.879l-24.783-24.783 c-8.951-8.951-20.83-13.877-33.455-13.877s-24.504,4.927-33.451,13.877l-14.822,14.822c-2.158,2.157-6.531,3.498-11.414,3.498 c-3.957,0-8.064-0.851-11.564-2.399c-3.139-1.386-6.352-2.717-9.553-3.957c-9.123-3.528-15.479-11.809-15.479-17.032V47.292 C357.461,21.218,336.246,0,310.172,0h-35.049c-26.077,0-47.289,21.215-47.289,47.292v20.982c0,5.223-6.356,13.5-15.475,17.029 c-3.191,1.233-6.405,2.564-9.553,3.954c-3.5,1.548-7.613,2.399-11.573,2.399c-4.883,0-9.259-1.34-11.417-3.495l-14.829-14.823 c-8.938-8.938-20.82-13.865-33.452-13.865s-24.504,4.927-33.431,13.877L73.334,98.122c-18.437,18.437-18.437,48.437,0,66.873 l14.823,14.823c3.69,3.69,5.052,14.039,1.102,22.987c-1.383,3.136-2.714,6.349-3.951,9.553 c-3.525,9.116-11.805,15.468-17.035,15.468H47.297c-26.077,0-47.289,21.215-47.289,47.292v35.049 c0,26.074,21.215,47.289,47.289,47.289H68.27c5.227,0,13.51,6.352,17.032,15.469c1.236,3.201,2.567,6.414,3.95,9.549 c3.951,8.949,2.589,19.297-1.102,22.988l-14.823,14.822c-18.437,18.434-18.437,48.449-0.006,66.9l24.786,24.789 c8.935,8.932,20.808,13.854,33.437,13.854c12.628,0,24.501-4.918,33.437-13.854l14.832-14.842 c2.188-2.189,6.454-3.496,11.408-3.496c3.957,0,8.063,0.85,11.567,2.398c3.109,1.377,6.328,2.711,9.562,3.963 c9.122,3.527,15.475,11.805,15.475,17.029v20.963c0,26.074,21.215,47.293,47.289,47.293h35.05 c26.076,0,47.289-21.215,47.289-47.293v-20.963c0-5.225,6.352-13.502,15.467-17.023c3.201-1.236,6.414-2.566,9.551-3.953 c3.5-1.545,7.607-2.396,11.564-2.396c4.889,0,9.266,1.34,11.422,3.498l14.822,14.822c8.961,8.936,20.842,13.854,33.469,13.854 c1.367,0,2.75-0.062,4.111-0.182c17.268-1.5,32.502-16.805,40.686-25.027l1.035-1.037l12.391-12.391 c18.404-18.451,18.404-48.455,0.008-66.895l-14.832-14.832c-3.689-3.689-5.051-14.039-1.102-22.99 c1.391-3.145,2.719-6.357,3.951-9.549c3.525-9.117,11.803-15.469,17.025-15.469h20.965c26.078,0,47.289-21.215,47.289-47.293 v-35.045C585.287,249.041,564.072,227.826,537.998,227.826z M420.607,292.643c0,70.559-57.402,127.961-127.959,127.961 c-70.558,0-127.96-57.402-127.96-127.961c0-70.557,57.403-127.959,127.96-127.959 C363.205,164.683,420.607,222.085,420.607,292.643z"/></g></g></svg>',
                                                                            click: function (event) {
                                                                                backgroundButtonsControllers.gradient.colors = Controls.design.styles.page.colors || backgroundButtonsControllers.gradient.colors;
                                                                                var modal = makeModal({
                                                                                    title: "Seleccione los colores",
                                                                                    mainContent: jQuery("<div />", {
                                                                                        "class": "modal-container",
                                                                                        html: jQuery("<div />", {
                                                                                            "class": "gradient-container",
                                                                                            html: backgroundButtonsControllers.gradient.gradientBox = jQuery("<div />", {
                                                                                                "class": "gradient-box",
                                                                                                css: {
                                                                                                    "background-image": "none",
                                                                                                    "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                                                    "background-image": "linear-gradient(to bottom, ".concat(backgroundButtonsControllers.gradient.colors[0]).concat(" 0%, ").concat(backgroundButtonsControllers.gradient.colors[1]).concat(" 100%)"),
                                                                                                },
                                                                                                html: [
                                                                                                    jQuery("<div />", {
                                                                                                        "class": "color-picker color-a",
                                                                                                        css: {
                                                                                                            "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                                                        },
                                                                                                    }).spectrum({
                                                                                                        showInput: true,
                                                                                                        preferredFormat: "rgb",
                                                                                                        change: function (color) {
                                                                                                            backgroundButtonsControllers.gradient.colors[0] = color.toRgbString();
                                                                                                            jQuery(this).css("background-color", color.toRgbString());
                                                                                                            backgroundButtonsControllers.gradient.gradientBox.css({
                                                                                                                "background-image": "none",
                                                                                                                "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                                                                "background-image": "linear-gradient(to bottom, ".concat(backgroundButtonsControllers.gradient.colors[0]).concat(" 0%, ").concat(backgroundButtonsControllers.gradient.colors[1]).concat(" 100%)"),
                                                                                                            });
                                                                                                        },
                                                                                                    }),
                                                                                                    jQuery("<div />", {
                                                                                                        "class": "color-picker color-b",
                                                                                                        css: {
                                                                                                            "background-color": backgroundButtonsControllers.gradient.colors[1],
                                                                                                        },
                                                                                                    }).spectrum({
                                                                                                        showInput: true,
                                                                                                        preferredFormat: "rgb",
                                                                                                        change: function (color) {
                                                                                                            backgroundButtonsControllers.gradient.colors[1] = color.toRgbString();
                                                                                                            jQuery(this).css("background-color", color.toRgbString());
                                                                                                            backgroundButtonsControllers.gradient.gradientBox.css({
                                                                                                                "background-image": "none",
                                                                                                                "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                                                                "background-image": "linear-gradient(to bottom, ".concat(backgroundButtonsControllers.gradient.colors[0]).concat(" 0%, ").concat(backgroundButtonsControllers.gradient.colors[1]).concat(" 100%)"),
                                                                                                            });
                                                                                                        },
                                                                                                    }),
                                                                                                ],
                                                                                            }),
                                                                                        }),
                                                                                    }),
                                                                                    handlerAccept: function (event) {
                                                                                        Controls.design.styles.page.colors = backgroundButtonsControllers.gradient.colors;
                                                                                        Controls.design.styles.page.css = {
                                                                                            "background-image": "none",
                                                                                            "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                                            "background-image": "linear-gradient(to bottom, ".concat(backgroundButtonsControllers.gradient.colors[0]).concat(" 0%, ").concat(backgroundButtonsControllers.gradient.colors[1]).concat(" 100%)"),
                                                                                        };
                                                                                        backgroundButtonsControllers.gradient.$el.children('.grid__inner').css(Controls.design.styles.page.css);
                                                                                        modal.modal('hide');
                                                                                    },
                                                                                });
                                                                            },
                                                                        }),
                                                                    ],
                                                                }),
                                                            }),
                                                            jQuery("<span />", {
                                                                "class": "grid__title",
                                                                html: "Gradiante",
                                                            }),
                                                        ],
                                                        click: function (event) {
                                                            jQuery(".background-option").removeClass("active");
                                                            jQuery(this).addClass("active");

                                                            Controls.design.styles.page.backgroundType = "gradient";
                                                            Controls.design.styles.page.colors = backgroundButtonsControllers.gradient.colors;

                                                            Controls.design.styles.page.css = {
                                                                "background-color": backgroundButtonsControllers.gradient.colors[0],
                                                                "background-image": "none",
                                                                // "background-image": "-moz-linear-gradient(top, ".concat(Controls.design.styles.page.color[0]).concat(" 0%, ").concat(Controls.design.styles.page.color[1]).concat(" 100%)"),
                                                                // "background-image": "-webkit-linear-gradient(top, ".concat(Controls.design.styles.page.color[0]).concat(" 0%, ").concat(Controls.design.styles.page.color[1]).concat(" 100%)"),
                                                                "background-image": "linear-gradient(to bottom, ".concat(backgroundButtonsControllers.gradient.colors[0]).concat(" 0%, ").concat(backgroundButtonsControllers.gradient.colors[1]).concat(" 100%)"),
                                                                // "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='".concat(Controls.design.styles.page.color[0]).concat("', endColorstr='").concat(Controls.design.styles.page.color[1]).concat("',GradientType=0 )"),
                                                            };
                                                        },
                                                    }),
                                                    backgroundButtonsControllers.image.$el = jQuery("<label />", {
                                                        "class": "grid__item background-option image ".concat(backgroundType == "image" ? "active" : ""),
                                                        html: [
                                                            jQuery("<div />", {
                                                                "class": "grid__inner",
                                                                css: {
                                                                    "background-image": "url(".concat(imageSrc || "https://linkea.pro/admin/assets/img/themes/default/background.jpg").concat(")"),
                                                                },
                                                                html: jQuery("<div />", {
                                                                    "class": "button-tools",
                                                                    html: [
                                                                        jQuery("<a />", {
                                                                            attr: {
                                                                                href: "#",
                                                                            },
                                                                            "class": "check-icon",
                                                                            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 191.667 191.667" style="enable-background:new 0 0 191.667 191.667;" xml:space="preserve"><path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685 c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971 l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969 C156.146,65.765,156.146,74.362,150.862,79.646z"/><g></svg>',
                                                                        }),
                                                                        jQuery("<a />", {
                                                                            "class": "config-icon",
                                                                            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="585.283px" height="585.283px" viewBox="0 0 585.283 585.283" style="enable-background:new 0 0 585.283 585.283;"xml:space="preserve"><g><g><path d="M537.998,227.826h-20.963c-5.225,0-13.502-6.353-17.029-15.471c-1.242-3.213-2.576-6.432-3.963-9.569 c-3.953-8.938-2.596-19.278,1.096-22.962l14.838-14.819c18.441-18.443,18.441-48.443,0.006-66.879l-24.783-24.783 c-8.951-8.951-20.83-13.877-33.455-13.877s-24.504,4.927-33.451,13.877l-14.822,14.822c-2.158,2.157-6.531,3.498-11.414,3.498 c-3.957,0-8.064-0.851-11.564-2.399c-3.139-1.386-6.352-2.717-9.553-3.957c-9.123-3.528-15.479-11.809-15.479-17.032V47.292 C357.461,21.218,336.246,0,310.172,0h-35.049c-26.077,0-47.289,21.215-47.289,47.292v20.982c0,5.223-6.356,13.5-15.475,17.029 c-3.191,1.233-6.405,2.564-9.553,3.954c-3.5,1.548-7.613,2.399-11.573,2.399c-4.883,0-9.259-1.34-11.417-3.495l-14.829-14.823 c-8.938-8.938-20.82-13.865-33.452-13.865s-24.504,4.927-33.431,13.877L73.334,98.122c-18.437,18.437-18.437,48.437,0,66.873 l14.823,14.823c3.69,3.69,5.052,14.039,1.102,22.987c-1.383,3.136-2.714,6.349-3.951,9.553 c-3.525,9.116-11.805,15.468-17.035,15.468H47.297c-26.077,0-47.289,21.215-47.289,47.292v35.049 c0,26.074,21.215,47.289,47.289,47.289H68.27c5.227,0,13.51,6.352,17.032,15.469c1.236,3.201,2.567,6.414,3.95,9.549 c3.951,8.949,2.589,19.297-1.102,22.988l-14.823,14.822c-18.437,18.434-18.437,48.449-0.006,66.9l24.786,24.789 c8.935,8.932,20.808,13.854,33.437,13.854c12.628,0,24.501-4.918,33.437-13.854l14.832-14.842 c2.188-2.189,6.454-3.496,11.408-3.496c3.957,0,8.063,0.85,11.567,2.398c3.109,1.377,6.328,2.711,9.562,3.963 c9.122,3.527,15.475,11.805,15.475,17.029v20.963c0,26.074,21.215,47.293,47.289,47.293h35.05 c26.076,0,47.289-21.215,47.289-47.293v-20.963c0-5.225,6.352-13.502,15.467-17.023c3.201-1.236,6.414-2.566,9.551-3.953 c3.5-1.545,7.607-2.396,11.564-2.396c4.889,0,9.266,1.34,11.422,3.498l14.822,14.822c8.961,8.936,20.842,13.854,33.469,13.854 c1.367,0,2.75-0.062,4.111-0.182c17.268-1.5,32.502-16.805,40.686-25.027l1.035-1.037l12.391-12.391 c18.404-18.451,18.404-48.455,0.008-66.895l-14.832-14.832c-3.689-3.689-5.051-14.039-1.102-22.99 c1.391-3.145,2.719-6.357,3.951-9.549c3.525-9.117,11.803-15.469,17.025-15.469h20.965c26.078,0,47.289-21.215,47.289-47.293 v-35.045C585.287,249.041,564.072,227.826,537.998,227.826z M420.607,292.643c0,70.559-57.402,127.961-127.959,127.961 c-70.558,0-127.96-57.402-127.96-127.961c0-70.557,57.403-127.959,127.96-127.959 C363.205,164.683,420.607,222.085,420.607,292.643z"/></g></g></svg>',
                                                                            click: function (event) {
                                                                                backgroundButtonsControllers.image.imagenSrc = Controls.design.styles.page.imageSrc || "https://linkea.pro/admin/assets/img/themes/default/background.jpg";
                                                                                let modal = makeModal({
                                                                                    title: "Seleccione una imágen de fondo",
                                                                                    mainContent: jQuery("<div />", {
                                                                                        "class": "modal-container",
                                                                                        html: jQuery("<div />", {
                                                                                            "class": "thumbnail-container",
                                                                                            css: {
                                                                                                with: "100%",
                                                                                                "padding-top": "56%",
                                                                                                position: "relative",
                                                                                            },
                                                                                            html: [
                                                                                                backgroundButtonsControllers.thumbnailPreview = jQuery("<div />", {
                                                                                                    "class": "thumbnail thumbnail-button",
                                                                                                    css: {
                                                                                                        width: "100%",
                                                                                                        height: "100%",
                                                                                                        position: "absolute",
                                                                                                        top: "0",
                                                                                                        "background-image": "url(".concat(backgroundButtonsControllers.image.imagenSrc).concat(")"),
                                                                                                    },
                                                                                                    html: input = jQuery("<input />", {
                                                                                                        attr: {
                                                                                                            type: "file",
                                                                                                            accept: "image/*",
                                                                                                        },
                                                                                                        change: function (event) {
                                                                                                            backgroundButtonsControllers.input = this;
                                                                                                            if (this.files && this.files[0]) {
                                                                                                                var files = this.files;
                                                                                                                var reader = new FileReader();
                                                                                                                backgroundButtonsControllers.thumbnailPreview.parent().addClass("uploading");
                                                                                                                modal.find(".btn-outline-primary").attr("disabled", "disabled");
                                                                                                                reader.onload = function (e) {
                                                                                                                    uploadImage(files[0])
                                                                                                                        .then((request) => {
                                                                                                                            backgroundButtonsControllers.image.imagenSrc = request.url;
                                                                                                                            backgroundButtonsControllers.thumbnailPreview.css("background-image", "url(".concat(request.url).concat(")"));
                                                                                                                            backgroundButtonsControllers.thumbnailPreview.parent().removeClass("uploading");
                                                                                                                            modal.find(".btn-outline-primary").removeAttr("disabled");
                                                                                                                        })
                                                                                                                        .catch((error) => {
                                                                                                                            console.log(error);
                                                                                                                            Swal.fire({
                                                                                                                                title: 'Error al cargar tu imagen',
                                                                                                                                text: 'Ocurrio un error al intentar cargar tu imagen, por favor vuelve a intentar.',
                                                                                                                                icon: 'error',
                                                                                                                                confirmButtonText: 'Aceptar'
                                                                                                                            });
                                                                                                                            backgroundButtonsControllers.thumbnailPreview.parent().removeClass("uploading");
                                                                                                                            modal.find(".btn-outline-primary").removeAttr("disabled");
                                                                                                                        });
                                                                                                                }
                                                                                                                reader.readAsDataURL(this.files[0]);
                                                                                                            }
                                                                                                            else {
                                                                                                                alert("Sorry - you're browser doesn't support the FileReader API");
                                                                                                            }
                                                                                                        },
                                                                                                    }),
                                                                                                }),
                                                                                                jQuery("<div />", {
                                                                                                    "class": "lds-ring",
                                                                                                    html: [
                                                                                                        jQuery("<div />"),
                                                                                                        jQuery("<div />"),
                                                                                                        jQuery("<div />"),
                                                                                                    ],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    }),
                                                                                    handlerAccept: function (event) {
                                                                                        backgroundButtonsControllers.image.$el.children('.grid__inner').css("background-image", "url(".concat(backgroundButtonsControllers.image.imagenSrc).concat(")"));
                                                                                        Controls.design.styles.page.imageSrc = backgroundButtonsControllers.image.imagenSrc;
                                                                                        Controls.design.styles.page.css["background-image"] = "url(".concat(backgroundButtonsControllers.image.imagenSrc).concat(")");
                                                                                        modal.modal('hide');
                                                                                    },
                                                                                });
                                                                            },
                                                                        }),
                                                                    ],
                                                                }),
                                                            }),
                                                            jQuery("<span />", {
                                                                "class": "grid__title",
                                                                html: "Imágen",
                                                            }),
                                                        ],
                                                        click: function (event) {
                                                            var imageSrc = Controls.design.styles.page.imageSrc || "https://linkea.pro/admin/assets/img/themes/default/background.jpg";
                                                            jQuery(".background-option").removeClass("active");
                                                            jQuery(this).addClass("active");
                                                            Controls.design.styles.page.backgroundType = "image";
                                                            Controls.design.styles.page.css["background-image"] = "url(".concat(imageSrc).concat(")");
                                                        },
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    })),
                    styles: {
                        buttons: {
                            send: {
                                color: Settings.design.styles.buttons.send.color,
                                bgcolor: Settings.design.styles.buttons.send.bgcolor,
                            },
                            reset: {
                                color: Settings.design.styles.buttons.reset.color,
                                bgcolor: Settings.design.styles.buttons.reset.bgcolor,
                            },
                        },
                        page: {
                            backgroundButtonsControllers: backgroundButtonsControllers,
                            backgroundType: backgroundType,
                            imageSrc: imageSrc,
                            color: color,
                            colors: colors,
                            css: {
                                "background-image": "none",
                                "background-color": "rgb(28,55,90)",
                            },
                        },
                        fonts: {
                            name: {
                                color: Settings.design.styles.fonts.name.color,
                                "font-family": Settings.design.styles.fonts.name["font-family"],
                                "font-weight": Settings.design.styles.fonts.name["font-weight"],
                                "font-style": Settings.design.styles.fonts.name["font-style"],
                            },
                            info: {
                                color: Settings.design.styles.fonts.info.color,
                                "font-family": Settings.design.styles.fonts.info["font-family"],
                                "font-weight": Settings.design.styles.fonts.info["font-weight"],
                                "font-style": Settings.design.styles.fonts.info["font-style"],
                            },
                            headers: {
                                color: Settings.design.styles.fonts.headers.color,
                                "font-family": Settings.design.styles.fonts.headers["font-family"],
                                "font-weight": Settings.design.styles.fonts.headers["font-weight"],
                                "font-style": Settings.design.styles.fonts.headers["font-style"],
                            },
                            base: {
                                color: Settings.design.styles.fonts.base.color,
                                "font-family": Settings.design.styles.fonts.base["font-family"],
                                "font-weight": Settings.design.styles.fonts.base["font-weight"],
                                "font-style": Settings.design.styles.fonts.base["font-style"],
                            },
                            controls: {
                                color: Settings.design.styles.fonts.controls.color,
                                "font-family": Settings.design.styles.fonts.controls["font-family"],
                                "font-weight": Settings.design.styles.fonts.controls["font-weight"],
                                "font-style": Settings.design.styles.fonts.controls["font-style"],
                            },
                        },
                    },
                };
            })(),
        }
    }
    init();

    return {
        el: el,
        $el: $el,
        controlsContainer: controlsContainer,
        controlsConstructorContainer: controlsConstructorContainer,
        controls: Controls,
        getData: () => {
            console.log("Controls: %o", Controls);
            return {
                id: Settings.id,
                emails_to: jQuery("#emails_to").val() || '',
                identity: {
                    name: Controls.identity.name.val(),
                    info: Controls.identity.info.val(),
                },
                design: {
                    styles: {
                        page: {
                            css: Controls.design.styles.page.css || {},
                            backgroundType: Controls.design.styles.page.backgroundType || "solid",
                            imageSrc: Controls.design.styles.page.imageSrc || null,
                            color: Controls.design.styles.page.color || null,
                            colors: Controls.design.styles.page.colors || null,
                        },
                        buttons: Controls.design.styles.buttons,
                        fonts: (function () {
                            Controls.design.styles.fonts.name["font-family"] = jQuery("#fonts_name").data("default");
                            Controls.design.styles.fonts.info["font-family"] = jQuery("#fonts_info").data("default");
                            Controls.design.styles.fonts.headers["font-family"] = jQuery("#fonts_headers").data("default");
                            Controls.design.styles.fonts.base["font-family"] = jQuery("#fonts_base").data("default");
                            Controls.design.styles.fonts.controls["font-family"] = jQuery("#fonts_controls").data("default");
                            console.log("Get Data Fonts: %o", Controls.design.styles.fonts);
                            return Controls.design.styles.fonts;
                        })(),
                    },
                },
                status: Controls.status.items.map((item) => {
                    return {
                        id: item.id,
                        slug: item.slug,
                        name: item.name,
                        initial: item.initial,
                        color: item.color,
                        bgcolor: item.bgcolor,
                        default: item.default,
                    };
                }),
                fields: Controls.fields.map((field) => {
                    return (function () {
                        if (field.type === 'title') {
                            return {
                                id: field.id,
                                type: field.type,
                                title: field.title.val(),
                                heading: field.heading.size(),
                                color: field.color(),
                            };
                        }
                        if (field.type === 'paragraph') {
                            return {
                                id: field.id,
                                type: field.type,
                                paragraph: field.paragraph.val(),
                                font_size: field.font_size.val(),
                                font_color: field.font_color.val(),
                                font_bold: field.font_bold.val(),
                                font_italic: field.font_italic.val(),
                                color: field.color(),
                            };
                        }
                        else if (field.type === "image") {
                            return {
                                id: field.id,
                                type: field.type,
                                image: field.image,
                            };
                        }
                        else if (field.type === "single" || field.type === "select" || field.type === "multiple") {
                            return {
                                id: field.id,
                                type: field.type,
                                options: field.options.map((option) => {
                                    return {
                                        id: option.id,
                                        label: option.label,
                                        value: option.value,
                                    };
                                }),
                                question: field.question.val(),
                                info: field.info.val(),
                                title: field.title.val(),
                                required: field.required.checked(),
                                visible: field.visible.checked(),
                                placeholder: field.placeholder.val(),
                            };
                        }
                        else {
                            return {
                                id: field.id,
                                type: field.type,
                                question: field.question.val(),
                                info: field.info.val(),
                                title: field.title.val(),
                                required: field.required.checked(),
                                visible: field.visible.checked(),
                                placeholder: field.placeholder.val(),
                            };
                        }
                    })()
                }),
            };
        },
    }
};



$(document).ready(function () {
    var lastScrollTop = $(window).scrollTop();
    var time = null;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > 100) {
            jQuery(".settings").css({
                position: "relative",
                top: (st - 50) + "px",
            });
        } else {
            jQuery(".settings").css({
                position: "relative",
                top: 0,
            });
        }
        lastScrollTop = st;
    });

    $(".controls-container").on("click", ".card.field-item", function (e) {
        if (!$(this).hasClass("selected")) {
            $(".card.field-item.selected").not(".collapsed-card").find(".btn-tool").trigger("click");
            $(".card.field-item.selected").removeClass("selected");
            $(this).addClass("selected");
            $(this).find(".btn-tool").trigger("click");
            $(this).find('input[type="text"]').focus();

            clearTimeout(time);
            time = setTimeout(() => {
                $("html, body").animate({
                    scrollTop: $(this).offset().top - 150,
                }, 500);
            }, 500);
        }
    });

    /* $(".card.field-item").on("click", "input", function (e) {
        $(".card.field-item").removeClass("selected");
        $(this).closest(".card").addClass("selected");
    }); */

    /* 	$("select.google-fonts").each(function (index, selectEl) {
            var id = $(selectEl).attr("id")
            selectGfont({
                key: 'AIzaSyDlD2NdRw4MDt-jDoTE_Hz3JqNpl154_qo', // Use You-Google-Fonts-API-Key
                containerFonte: '#'.concat(id),
                // containerVariante: false,
                sort: 'popularity',
                //   onSelectFonte: 'handler_'.concat(id),
                // onSelectVariante: 'sGFselecionado'
            }).then(function () {
    
            }).catch(function (erro) {
                console.log(erro);
            });
        }); */


    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});


jQuery(function () {
    var formsControls = jQuery("#forms-contructos-container").forms();
    /*  */
    jQuery("#save").on("click", function (e) {
        e.preventDefault();
        var data = formsControls.getData();
        console.log("data %o", data);
        jQuery.ajax({
            url: HOME_URL.concat("/pages/questionnaires/scripts/create.php"),
            type: "POST",
            dataType: "json",
            data: {
                code: data.id,
                name: data.identity.name,
                'jsonData': data.fields,
            },
        }).done(function (response, textStatus, jqXHR) {
            if (response.success) {
                window.location = HOME_URL.concat("/questionnaires/edit/").concat(response.id);
            } else {
                console.log(response.last_error);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error:' + textStatus);
        });
    });
});