<template>
  <div class="layout-view">
    <div class="app-content">
      <div class="app-content-children">
        <div class="base-page-layout">
          <div class="base-page-layout-components">
            <div class="card">
              <div class="card-form">
                <div class="add-product-components">
                  <div class="card-form-variants">
                    <div class="variants-header">
                      <span class="var-header-text" style="color: #000">
                        Варианты
                      </span>
                      <span class="var-header-text-count" style="color: #bbb7c9">
                        1 из 30
                      </span>
                    </div>
                    <div class="variants-option">
                      <div class="variants-option-card">
                        <div class="variant-item">
                          <div class="variant-item-image">
                            <div v-if="previewFiles.length === 0" class="variant-item-image-empty">
                              <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.8391 17.6641L2.33906 1.16406L1.16406 2.33906L3.08906 4.2724V15.2474C3.08906 16.1641
                                  3.83906 16.9141 4.75573 16.9141H15.7307L17.6557 18.8391L18.8391 17.6641ZM4.75573
                                  15.2474V5.93906L10.4557 11.6391L9.75573 12.5141L8.08906 10.2474L5.58906 13.5807H12.3974L14.0641
                                  15.2474H4.75573ZM7.11406 3.58073L5.4474 1.91406H16.4224C17.3391 1.91406 18.0891 2.66406 18.0891
                                  3.58073V14.5557L16.4224 12.8891V3.58073H7.11406Z" fill="#D1CFD7"></path>
                              </svg>
                            </div>
                            <template v-else>
                              <img
                                  v-if="previewFiles[0].type.startsWith('image/')"
                                  :src="previewFiles[0].preview"
                                  alt=""
                                  class="variant-item-preview"
                              >
                            </template>
                          </div>
                          <div class="variant-item-content">
                            <div class="variant-item-content-rate">
                              <div class="rating-tag" :style="getRatingStyle(product.rating)">
                                {{ product.rating }}
                              </div>
                            </div>
                            <div class="variant-item-content-title">
                              {{ variantItem.title || 'Укажите наименование' }}
                            </div>
                            <div class="variant-item-content-vendor">{{ variantItem.vendor }}</div>
                            <div class="variant-item-content-charcs-wrapper">
                              <div class="variant-item-content-charcs-wrapper-sec">
                                <div class="variant-item-content-charcs-text">
                                  <div class="variant-item-content-charcs-value">
                                    {{ variantItem.selectedColor.length ? variantItem.selectedColor.join(', ') : '' }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="variant-item-content-buttons"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form class="card-form-form" @submit.prevent>
                    <div class="card-form-subject-selector">
                      <div class="subject-selector">
                        <div class="subject-selector-warning">
                          <div class="subject-selector-warning-icon">
                            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                              <path clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23
                                5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3
                                16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13.0036
                                13.9983H14.003V15.9983H10.003V13.9983H11.003V11.9983H10.003V9.99835H13.0036V13.9983ZM13.0007
                                7.99835C13.0007 8.55063 12.5528 8.99835 12.0003 8.99835C11.4479 8.99835 11 8.55063 11 7.99835C11
                                7.44606 11.4479 6.99835 12.0003 6.99835C12.5528 6.99835 13.0007 7.44606 13.0007 7.99835Z"
                                    fill="#5067DE" fill-rule="evenodd"></path>
                            </svg>
                          </div>
                          <span class="subject-selector-warning-text">
                            Добавьте фото, название, описание и категорию продавца
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="card-form-form-variants">
                      <div class="variants">
                        <div class="variants-variant">
                          <div class="variants-media">
                            <div data-error="false">
                              <div class="card-media-files-editor" id="media">
                                <div class="media-dnd-files"
                                     @dragover.prevent="handleDragOver"
                                     @dragleave.prevent="handleDragLeave"
                                     @drop.prevent="handleDrop"
                                     :class="{ 'dragover': isDragging }"
                                >
                                  <template v-if="previewFiles.length === 0">
                                    <div class="uploader-button">
                                      <button class="uploader-button-button-icon" type="button" @click="triggerFileInput">
                                        <div class="uploader-button-icon">
                                          <svg fill="none" height="112" viewBox="0 0 145 112" width="145" xmlns="http://www.w3.org/2000/svg">
                                            <rect fill="#F7F7FA" height="67.9879" rx="7.11874" stroke="#D1CFD7" stroke-dasharray="2 2" stroke-width="0.5" transform="rotate(-9.33849 0.7228 38.6241)" width="52.0605" x="0.7228" y="38.6241"></rect><g filter="url(#filter0_d_2035_118574)"><rect fill="#F7F7FA" height="68.4879" rx="7.36874" transform="rotate(4.51004 39.666 20.7344)" width="52.5605" x="39.666" y="20.7344"></rect><rect height="67.9879" rx="7.11874" stroke="#D1CFD7" stroke-dasharray="2 2" stroke-width="0.5" transform="rotate(4.51004 39.8956 21.0033)" width="52.0605" x="39.8956" y="21.0033"></rect></g><g filter="url(#filter1_d_2035_118574)"><rect fill="#F7F7FA" height="68.4879" rx="7.36874" transform="rotate(16.9159 83.2754 6)" width="52.5604" x="83.2754" y="6"></rect><rect height="67.9879" rx="7.11874" stroke="#D1CFD7" stroke-dasharray="2 2" stroke-width="0.5" transform="rotate(16.9159 83.4418 6.31193)" width="52.0604" x="83.4418" y="6.31193"></rect></g><defs><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="97.2969" id="filter0_d_2035_118574" width="82.6719" x="21.8359" y="14.2891"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="6"></feOffset><feGaussianBlur stdDeviation="6.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.125417 0 0 0 0 0.142829 0 0 0 0 0.232917 0 0 0 0.1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2035_118574"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_2035_118574" mode="normal" result="shape"></feBlend></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="103.172" id="filter1_d_2035_118574" width="92.5664" x="52.1719" y="0.824219"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="6"></feOffset><feGaussianBlur stdDeviation="6.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.125417 0 0 0 0 0.142829 0 0 0 0 0.232917 0 0 0 0.1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2035_118574"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_2035_118574" mode="normal" result="shape"></feBlend></filter></defs>
                                          </svg>
                                        </div>
                                        <div class="uploader-button-add">Загрузите файлы или перетащите их сюда</div>
                                        <div class="uploader-button-requirements-tooltip">
                                          <div class="requirements-tooltip">
                                            <div class="requirements-tooltip-trigger" role="button" tabindex="-1">
                                              <div class="requirements-tooltip-text">Какими должны быть фото и видео</div>
                                              <div class="requirements-tooltip-icon">
                                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M7.33398 4.66536H8.66732V5.9987H7.33398V4.66536ZM7.33398
                                                  7.33203H8.66732V11.332H7.33398V7.33203ZM8.00065 1.33203C4.32065 1.33203 1.33398
                                                  4.3187 1.33398 7.9987C1.33398 11.6787 4.32065 14.6654 8.00065 14.6654C11.6807
                                                  14.6654 14.6673 11.6787 14.6673 7.9987C14.6673 4.3187 11.6807 1.33203 8.00065
                                                  1.33203ZM8.00065 13.332C5.06065 13.332 2.66732 10.9387 2.66732 7.9987C2.66732
                                                  5.0587 5.06065 2.66536 8.00065 2.66536C10.9407 2.66536 13.334 5.0587 13.334
                                                  7.9987C13.334 10.9387 10.9407 13.332 8.00065 13.332Z" fill="#D1CFD7"></path>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="uploader-button-choose">
                                          <button class="choose-media btn-settings">
                                            <span class="caption">Выбрать</span>
                                          </button>
                                        </div>
                                      </button>
                                      <input
                                          ref="fileInput"
                                          @change="handleFileUpload"
                                          accept="image/jpg,image/png,image/jpeg,image/webp,video/mp4,video/quicktime"
                                          autocomplete="off"
                                          class="media-upload-input"
                                          id="photo"
                                          multiple name="photo"
                                          type="file"
                                      >
                                    </div>
                                    <div class="card-media-files-editor-media-files">
                                      <div v-for="(file, index) in previewFiles" :key="index" class="preview-item">
                                        <img
                                            v-if="file.type.startsWith('image/')"
                                            :src="file.preview"
                                            alt="Preview"
                                            class="preview-image"
                                        >
                                        <div v-else class="file-info">
                                          <svg><!-- иконка для видео --></svg>
                                          <span>{{ file.name }}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                  <template v-else>
                                    <div class="card-media-files-editor-media-files">
                                      <!-- Проверяем, что в массиве есть хотя бы один элемент -->
                                      <template v-if="previewFiles.length">
                                        <div v-for="(file, index) in previewFiles" :key="index" v-if="index !== 0" role="button" class="sortable-item" @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null" draggable="false" @dragstart.prevent>
                                          <div class="media-render-photo">
                                            <div class="media-render-photo-labels" v-if="index === 0">
                                              <div class="media-render-photo-main-label">
                                                <div class="media-render-photo-label-icon">
                                                  <svg fill="none" height="16" viewBox="-3 -1 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                                    <path clip-rule="evenodd" d="M8.17589 10.53C8.72233 9.76303 8.66135 8.9553 8.28244 7.50235C7.53307 4.62882 7.83147 3.05383 10.4148 1.18916L11.6757 0.279053L11.9807 1.80389C12.3048 3.42441 12.837 4.42671 14.2037 6.35464C14.258 6.43122 14.258 6.43122 14.3125 6.50815C16.2811 9.28542 17.0001 10.9596 17.0001 14C17.0001 17.6884 13.2714 21 9.00008 21C4.72849 21 1.00008 17.6888 1.00008 14C1.00008 13.9311 1.00015 13.9331 0.98847 13.6285C0.898114 11.2718 1.33389 9.42737 3.09715 7.43586C3.4697 7.01509 3.89316 6.61068 4.36971 6.22371L5.4217 5.36946L5.92774 6.62658C6.30166 7.55547 6.73978 8.28567 7.23469 8.82151C7.65387 9.27536 7.96482 9.84607 8.17589 10.53ZM4.59457 8.76166C3.2372 10.2947 2.91449 11.6606 2.987 13.5518C3.0005 13.9039 3.00008 13.8915 3.00008 14C3.00008 16.5279 5.78368 19 9.00008 19C12.2162 19 15.0001 16.5275 15.0001 14C15.0001 11.4582 14.4318 10.135 12.6808 7.6647C12.6266 7.58818 12.6266 7.58818 12.572 7.51125C11.5086 6.01111 10.8748 4.96759 10.4554 3.80052C9.77056 4.62118 9.81083 5.43739 10.2177 6.99766C10.9671 9.87118 10.6687 11.4462 8.08535 13.3108L6.61235 14.3741L6.50193 12.5608C6.43138 11.4023 6.16915 10.6156 5.76547 10.1785C5.36665 9.74668 5.00655 9.24115 4.68363 8.66279C4.65351 8.69566 4.62382 8.72862 4.59457 8.76166Z" fill="#fff" fill-rule="evenodd"></path>
                                                  </svg>
                                                </div>
                                                <div class="media-render-photo-label-text">Главная</div>
                                              </div>
                                            </div>
                                            <div class="media-render-photo-dropdown" :style="{ opacity: hoveredIndex === index ? 1 : 0 }">
                                              <div class="media-dropdown" id="dropdown-container">
                                                <button class="media-dropdown-actions" type="button" aria-label="actions">
                                                  <svg fill="none" height="16" viewBox="-10 -3 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                                    <path clip-rule="evenodd" d="M0 2C0 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2ZM2 11C0.89543 11 0 10.1046 0 9C0 7.89543 0.89543 7 2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11ZM2 18C0.89543 18 0 17.1046 0 16C0 14.8954 0.89543 14 2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18Z" fill="#000" fill-rule="evenodd"></path>
                                                  </svg>
                                                </button>
                                              </div>
                                            </div>
                                            <!-- Отображаем изображение, используя первый элемент массива -->
                                            <img v-if="file.type.startsWith('image/')"
                                                 class="media-render-photo-image"
                                                 :src="file.preview"
                                                 alt="Preview">
                                            <input
                                                accept="image/jpg,image/png,image/jpeg,image/webp,video/mp4,video/quicktime"
                                                class="media-upload-input"
                                                type="file"
                                                @change="handleFileUpload"
                                            >
                                          </div>
                                        </div>
                                      </template>
                                      <div id="DndDescribedBy-0" style="display: none;"></div>
                                      <div id="DndLiveRegion-0" role="status"></div>
                                      <div class="uploader-button uploader-button-mini">
                                        <button aria-label="add" class="uploader-button-button-icon uploader-button-button-icon-mini" type="button" @click="triggerFileInput">
                                          <div class="uploader-button-plus uploader-button-plus-mini">
                                            <svg fill="none" height="20" viewBox="-2 -2 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                                              <path clip-rule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#5067de" fill-rule="evenodd"></path>
                                            </svg>
                                          </div>
                                          <span class="uploader-mini-text">Фото и видео</span>
                                        </button>
                                        <input
                                            accept="image/jpg,image/png,image/jpeg,image/webp,video/mp4,video/quicktime"
                                            class="media-upload-input"
                                            type="file"
                                            @change="handleFileUpload"
                                            autocomplete="off"
                                            multiple
                                            name="photo"
                                            id="photo"
                                            ref="fileInput"
                                        >
                                      </div>
                                    </div>
                                  </template>
                                </div>
                                <div class="card-media-files-editor-open-photo">
                                  <button class="photo-edit-gradient-button" type="button">
                                    <svg fill="none" height="20" viewBox="0 0 21 20" width="21"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M16.334 7.49967L17.3757 5.20801L19.6673 4.16634L17.3757 3.12467L16.334 0.833008L15.2923 3.12467L13.0007 4.16634L15.2923 5.20801L16.334 7.49967Z"
                                          fill="currentColor"></path>
                                      <path
                                          d="M16.334 12.4997L15.2923 14.7913L13.0007 15.833L15.2923 16.8747L16.334 19.1663L17.3757 16.8747L19.6673 15.833L17.3757 14.7913L16.334 12.4997Z"
                                          fill="currentColor"></path>
                                      <path
                                          d="M10.084 7.91634L8.00065 3.33301L5.91732 7.91634L1.33398 9.99967L5.91732 12.083L8.00065 16.6663L10.084 12.083L14.6673 9.99967L10.084 7.91634ZM8.82565 10.8247L8.00065 12.6413L7.17565 10.8247L5.35898 9.99967L7.17565 9.17467L8.00065 7.35801L8.82565 9.17467L10.6423 9.99967L8.82565 10.8247Z"
                                          fill="currentColor"></path>
                                    </svg>
                                    <span class="photo-edit-text" data-name="text">
                                      Открыть редактор
                                    </span>
                                  </button>
                                </div>
                                <div class="card-media-files-editor-studio">
                                  <div class="laag-tooltip">
                                    <button class="photo-studio-btn" disabled type="button">
                                      <svg fill="none" height="20" viewBox="-2 -3 28 28" width="20"
                                           xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd"
                                              d="M20.625 20H1.375C1.01033 20 0.66059 19.8495 0.402727 19.5816C0.144865 19.3137 0 18.9503 0 18.5714V4.28571C0 3.90683 0.144865 3.54347 0.402727 3.27556C0.66059 3.00765 1.01033 2.85714 1.375 2.85714H4.8125L7.5625 0H14.4375L17.1875 2.85714H20.625C20.9897 2.85714 21.3394 3.00765 21.5973 3.27556C21.8551 3.54347 22 3.90683 22 4.28571V18.5714C22 18.9503 21.8551 19.3137 21.5973 19.5816C21.3394 19.8495 20.9897 20 20.625 20ZM19.9375 5H16.3329L13.5829 2.14286H8.41706L5.66706 5H2.0625V17.8571H19.9375V5ZM11 5.71429C11.9518 5.71429 12.8823 6.00753 13.6737 6.55694C14.4651 7.10635 15.0819 7.88725 15.4462 8.80088C15.8104 9.71451 15.9057 10.7198 15.72 11.6897C15.5343 12.6596 15.076 13.5505 14.403 14.2498C13.7299 14.9491 12.8724 15.4253 11.9389 15.6182C11.0053 15.8111 10.0377 15.7121 9.15833 15.3337C8.27896 14.9552 7.52736 14.3144 6.99855 13.4921C6.46975 12.6699 6.1875 11.7032 6.1875 10.7143C6.1875 9.3882 6.69453 8.11644 7.59705 7.17876C8.49957 6.24108 9.72365 5.71429 11 5.71429ZM11 13.5714C11.5439 13.5714 12.0756 13.4039 12.5278 13.0899C12.9801 12.776 13.3325 12.3297 13.5407 11.8077C13.7488 11.2856 13.8033 10.7111 13.6972 10.1569C13.5911 9.60265 13.3291 9.09356 12.9445 8.69398C12.56 8.2944 12.0699 8.0223 11.5365 7.91205C11.0031 7.80181 10.4501 7.85837 9.94762 8.07462C9.44513 8.29087 9.01563 8.65708 8.71346 9.12694C8.41128 9.59679 8.25 10.1492 8.25 10.7143C8.25 11.472 8.53973 12.1988 9.05545 12.7346C9.57118 13.2704 10.2707 13.5714 11 13.5714Z"
                                              fill="#fff" fill-rule="evenodd"></path>
                                      </svg>
                                      <span class="caption">Фотостудия</span>
                                    </button>
                                  </div>
                                </div>
                                <div class="card-media-files-tag-edit">
                                  <div class="laag-tooltip">
                                    <button class="photo-studio-btn tag-studio-btn" disabled type="button">
                                      <svg fill="none" height="20" viewBox="-2 -3 28 28" width="20"
                                           xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd"
                                              d="M15.7479 4.74768C15.3489 4.74768 14.9662 4.90621 14.6841 5.18834C14.4019 5.47048 14.2434 5.85313 14.2434 6.25214C14.2434 6.54969 14.3316 6.84057 14.497 7.08797C14.6623 7.33538 14.8972 7.52822 15.1721 7.64209C15.4471 7.75597 15.7495 7.78572 16.0414 7.72768C16.3332 7.66963 16.6013 7.52633 16.8117 7.31593C17.0221 7.10553 17.1654 6.8375 17.2234 6.54566C17.2815 6.25382 17.2517 5.9513 17.1378 5.6764C17.0239 5.40149 16.8311 5.16652 16.5837 5.00121C16.3363 4.83589 16.0454 4.74768 15.7479 4.74768Z"
                                              fill="currentColor" fill-rule="evenodd"></path>
                                        <path clip-rule="evenodd"
                                              d="M10.8234 21.5595L21.5592 10.8237C21.699 10.6839 21.8099 10.518 21.8855 10.3354C21.9611 10.1527 22.0001 9.95695 22 9.75929V1.50446C22 1.10545 21.8415 0.722806 21.5594 0.440666C21.2772 0.158529 20.8946 0 20.4955 0H12.24C11.841 8.52052e-05 11.4584 0.158645 11.1763 0.440806L0.440484 11.1766C0.158441 11.4588 0 11.8414 0 12.2403C0 12.6392 0.158457 13.0218 0.4405 13.304L8.69604 21.5595C8.97817 21.8416 9.36077 22 9.75969 22C10.1586 22 10.5412 21.8415 10.8234 21.5595ZM5.56788 9.34556L12.5828 2.33068H19.6693V9.41724L12.6551 16.4321L5.56788 9.34556ZM2.67315 12.2403L3.92006 10.9934L11.0073 18.08L9.7597 19.3275L2.67315 12.2403Z"
                                              fill="currentColor" fill-rule="evenodd"></path>
                                      </svg>
                                      <span class="caption">Отметить товар</span>
                                      <div class="subscribe-item">
                                        <svg fill="none" height="12" viewBox="0 0 12 12" width="12"
                                             xmlns="http://www.w3.org/2000/svg">
                                          <circle cx="6" cy="6" fill="url(#paint0_linear_3084_36177)" fill-opacity="0.4"
                                                  r="6"></circle>
                                          <circle cx="6" cy="6" fill="url(#paint1_linear_3084_36177)" r="3.75"></circle>
                                          <defs>
                                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3084_36177"
                                                            x1="0" x2="12" y1="0" y2="12">
                                              <stop stop-color="#FF9649"></stop>
                                              <stop offset="1" stop-color="#FF5E62"></stop>
                                            </linearGradient>
                                            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_3084_36177"
                                                            x1="2.25" x2="9.75" y1="2.25" y2="9.75">
                                              <stop stop-color="#FF9649"></stop>
                                              <stop offset="1" stop-color="#FF5E62"></stop>
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                        <div class="subscribe-item-text">
                                          <span class="subscribe-text-inside">
                                            Джем
                                          </span>
                                        </div>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                                <div class="card-media-files-editor-upload-by-link">
                                  <div class="media-upload-by-link">
                                    <div class="media-upload-by-link-label">
                                      <label class="media-label" data-name="Label" for="upload-by-link">
                                        или добавить по ссылке
                                      </label>
                                    </div>
                                    <div class="media-upload-by-link-fields">
                                      <div class="media-upload-by-link-input">
                                        <div class="simple-input" data-name="SimpleInput">
                                          <input autocomplete="off" class="simple-input-field" name="upload-by-link"
                                                 placeholder="https://">
                                        </div>
                                      </div>
                                      <div class="media-upload-by-link-button">
                                        <button class="button-link">
                                          <span class="button-link-icon">
                                            <svg fill="none" height="24" viewBox="-2 -3 24 24" width="24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                              <path clip-rule="evenodd"
                                                    d="M14.5858 10.0001H0V8.00008H14.5858L8.29289 1.70718L9.70711 0.292969L18.4142 9.00008L9.70711 17.7072L8.29289 16.293L14.5858 10.0001Z"
                                                    fill="#4e4e53" fill-rule="evenodd"></path>
                                            </svg>
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="variants-variant-fields">
                            <div class="variants-main-fields">
                              <!--отсюда стили-->
                              <div class="main-fields">
                                <div class="main-fields-title">
                                  <span class="main-fields-text">Основная информация</span>
                                  <div class="main-fields-rating">
                                    <div class="laag-tooltip">
                                      <div class="rating-tag" :style="getRatingStyle(product.rating)">Качество карточки: {{ product.rating }}</div>
                                    </div>
                                  </div>
                                </div>
                                <div class="field-wrapper" id="title">
                                  <div class="field-wrapper-label-wrapper">
                                    <div class="field-wrapper-label">
                                      <span class="field-wrapper-label-text">Наименование</span>
                                    </div>
                                  </div>
                                  <div class="field-wrapper-field">
                                    <div class="title-input" data-error="false">
                                      <div class="title-input-field" id="title-input-field">
                                        <div class="editable">
                                          <div style="display: inline-block; position: relative; width: 100%; height: 40px;">
                                            <div style="position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%; height: 40px;"></div>
                                            <textarea v-model="variantItem.title" class="editable-input" id="editable-input" rows="1" spellcheck="false" style="resize: none; width: 100%; min-height: 40px; background: transparent; margin: 0px; caret-color: rgb(0, 0, 0); height: 38px; position: absolute;"></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="field-wrapper" id="subjectInfo.supplierSubject">
                                  <div class="field-wrapper-label-wrapper">
                                    <div class="field-wrapper-label">
                                      <span class="field-wrapper-label-text field-wrapper-label-text-has-tooltip">
                                        Категория продавца
                                      </span>
                                      <div class="laag-tooltip laag-tooltip-label">
                                        <div class="field-wrapper-label-icon">
                                          <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="field-wrapper-field">
                                    <div class="supplier-subject-select" data-error="false" id="supplier-subject-select">
                                      <div class="supplier-subject-select-wrapper">
                                        <div v-if="variantItem.category && variantItem.subcategory" class="supplier-subject-select-subject">
                                          {{ variantItem.subcategory.name }}
                                        </div>
                                        <div class="supplier-subject-select-select-button">
                                          <button class="choose-media btn-settings" type="button" @click="isCategories = true">
                                            <span class="caption" v-if="!variantItem.category && !variantItem.subcategory">Выбрать</span>
                                            <span class="caption" v-if="variantItem.category && variantItem.subcategory">Изменить</span>
                                          </button>
                                        </div>
                                        <div v-if="variantItem.category && variantItem.subcategory" class="adult-checkbox">
                                          <div class="laag-tooltip">
                                            <div class="checkboxWithLabel">
                                              <div class="checkboxWrapper">
                                                <input class="control" name="variants[0].isAdult" type="checkbox" style="cursor: pointer;" v-model="variantItem.eighteen">
                                              </div>
                                              <label class="content">
                                                <div class="label" style="cursor: pointer; color: #4a4a59; font-size: 16px; line-height: 18px;">18+</div>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="main-fields-articles">
                                  <div class="field-wrapper" id="vendorCode" style="padding-bottom: 16px">
                                    <div class="field-wrapper-label-wrapper">
                                      <div class="field-wrapper-label">
                                        <span class="field-wrapper-label-text field-wrapper-label-text-has-tooltip">
                                          Артикул продавца
                                        </span>
                                        <div class="laag-tooltip laag-tooltip-label">
                                          <span class="field-wrapper-label-icon">
                                            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                              <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="field-wrapper-field">
                                      <div class="form-input" data-error="false">
                                        <div class="form-input-field">
                                          <div class="input" data-name="SimpleInput">
                                            <input v-model="variantItem.vendor" autocomplete="off" class="input-field input-field-empty" inputmode="text" id="variants[0].vendorCode" name="variants[0].vendorCode" type="text" value>
                                            <div class="input-button-wrapper"></div>
                                          </div>
                                          <button class="form-input-custom-action" type="button" aria-label="custom" @click="generateVendorCode">
                                            <span class="laag-tooltip laag-tooltip-label">
                                              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.0017 5L13.6283 3.62667L15.0017 3L13.6283 2.37333L13.0017 1L12.375 2.37333L11.0017 3L12.375 3.62667L13.0017 5Z" fill="#6C11C9"></path><path d="M5.335 5L5.96167 3.62667L7.335 3L5.96167 2.37333L5.335 1L4.70833 2.37333L3.335 3L4.70833 3.62667L5.335 5Z" fill="#6C11C9"></path><path d="M13.0017 8.66667L12.375 10.04L11.0017 10.6667L12.375 11.2933L13.0017 12.6667L13.6283 11.2933L15.0017 10.6667L13.6283 10.04L13.0017 8.66667Z" fill="#6C11C9"></path><path d="M11.475 6.41333L9.58833 4.52667C9.455 4.4 9.28833 4.33333 9.115 4.33333C8.94167 4.33333 8.775 4.4 8.64167 4.52667L1.195 11.9733C0.935 12.2333 0.935 12.6533 1.195 12.9133L3.08167 14.8C3.215 14.9333 3.38167 15 3.555 15C3.72833 15 3.895 14.9333 4.02833 14.8067L11.475 7.36C11.735 7.1 11.735 6.67333 11.475 6.41333ZM9.115 5.94667L10.055 6.88667L9.275 7.66667L8.335 6.72667L9.115 5.94667ZM3.555 13.3933L2.615 12.4533L7.395 7.66667L8.335 8.60667L3.555 13.3933Z" fill="#6C11C9"></path>
                                              </svg>
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="separated-charcs separated-charcs-single"></div>
                                <div class="separated-charcs separated-charcs-single"></div>
                              </div>
                              <!--отсюда стили-->
                            </div>
                            <div class="field-wrapper" id="brand" v-if="variantItem.subcategory">
                              <div class="field-wrapper-label-wrapper">
                                <div class="field-wrapper-label">
                                  <span class="field-wrapper-label-text field-wrapper-label-text-has-tooltip">
                                    Бренд
                                  </span>
                                </div>
                              </div>
                              <div class="field-wrapper-field">
                                <div class="supplier-subject-select" data-error="false" id="supplier-subject-select">
                                  <div class="supplier-subject-select-wrapper">
                                    <div v-if="variantItem.brand" class="supplier-subject-select-subject">
                                      {{ variantItem.brand }}
                                    </div>
                                    <div class="supplier-subject-select-select-button">
                                      <button class="choose-media btn-settings" type="button" @click="generateBrand">
                                        <span class="caption" v-if="!variantItem.category && !variantItem.subcategory">Выбрать</span>
                                        <span class="caption" v-if="variantItem.category && variantItem.subcategory">Изменить</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="variants-description">
                              <div class="field-wrapper" id="description">
                                <div class="field-wrapper-label-wrapper">
                                  <div class="field-wrapper-label">
                                    <span class="field-wrapper-label-text"></span>
                                  </div>
                                </div>
                                <div class="field-wrapper-field">
                                  <div class="description-input" data-error="false">
                                    <div class="description-header">
                                      <div class="description-label" id="digital">
                                        <span class="text">Описание</span>
                                        <div class="laag-tooltip">
                                          <div class="description-label-icon">
                                            <svg fill="none" height="20" viewBox="-1 -1 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                                              <path clip-rule="evenodd" d="M0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11ZM20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM12.0036 12.9983H13.003V14.9983H9.00295V12.9983H10.003V10.9983H9.00295V8.99835H12.0036V12.9983ZM12.0007 6.99835C12.0007 7.55063 11.5528 7.99835 11.0003 7.99835C10.4479 7.99835 10 7.55063 10 6.99835C10 6.44606 10.4479 5.99835 11.0003 5.99835C11.5528 5.99835 12.0007 6.44606 12.0007 6.99835Z" fill="#d1cfd7" fill-rule="evenodd"></path>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="description-input-description-wrapper">
                                      <div class="editable">
                                        <div :style="{ display: 'inline-block', position: 'relative', width: '100%', height: Math.max(textAreaHeight, 130) + 'px' }">
                                          <div :style="{ position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '100%', height: Math.max(textAreaHeight, 130) + 'px' }">
                                            <div class="editable-input-settings">
                                              <span style="color: transparent">
                                                &#8203;
                                              </span>
                                            </div>
                                          </div>
                                          <textarea
                                              ref="textarea"
                                              class="editable-input editable-input-is-description"
                                              id="editable-description"
                                              rows="6"
                                              spellcheck="false"
                                              :style="textareaStyle"
                                              @mouseup="updateHeight"
                                              v-model="variantItem.description"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="description-generate-actions">
                                      <div class="description-generate-actions-usage-wrapper">
                                        <span class="text text-bold text-black">Доступно 20</span>
                                        <span class="description-generate-actions-generation-total-wrapper">
                                          <span class="text text-bold">из 20</span>
                                        </span>
                                      </div>
                                      <div class="description-generate-actions-generate-wrapper">
                                        <div class="laag-tooltip">
                                          <button class="choose-media btn-settings" disabled type="button">
                                            <span class="caption">Сгенерировать</span>
                                            <div class="rt-icon rt-icon-size-sm">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <path d="M16.9997 2C17.552 2 17.9997 2.44772 17.9997 3V5H19.9997C20.552 5 20.9997 5.44772 20.9997 6C20.9997 6.55228 20.552 7 19.9997 7H17.9997V9C17.9997 9.55228 17.552 10 16.9997 10C16.4474 10 15.9997 9.55228 15.9997 9V7H13.9997C13.4474 7 12.9997 6.55228 12.9997 6C12.9997 5.44772 13.4474 5 13.9997 5H15.9997V3C15.9997 2.44772 16.4474 2 16.9997 2Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.49552 6.29165C7.81184 6.12853 8.18753 6.12853 8.50385 6.29165C8.81678 6.45302 8.9523 6.72368 8.98184 6.78269L8.98431 6.78759C9.02114 6.86043 9.05447 6.94418 9.07209 6.98843L9.07672 7.00005L10.769 11.2307L14.9997 12.923L15.0113 12.9277C15.0556 12.9453 15.1393 12.9786 15.2122 13.0154L15.2171 13.0179C15.2761 13.0474 15.5467 13.183 15.7081 13.4959C15.8712 13.8122 15.8712 14.1879 15.7081 14.5042C15.5467 14.8171 15.2761 14.9527 15.2171 14.9822L15.2122 14.9847C15.1393 15.0215 15.0556 15.0548 15.0114 15.0724L14.9997 15.0771L10.769 16.7694L9.07672 21.0001L9.07209 21.0117C9.05447 21.0559 9.02114 21.1397 8.98431 21.2125L8.98184 21.2174C8.9523 21.2764 8.81677 21.5471 8.50385 21.7085C8.18753 21.8716 7.81184 21.8716 7.49552 21.7085C7.1826 21.5471 7.04708 21.2764 7.01753 21.2174L7.01507 21.2125C6.97823 21.1397 6.94489 21.0559 6.92728 21.0117L6.92265 21.0001L5.23038 16.7694L0.999687 15.0771L0.988071 15.0725C0.943821 15.0548 0.860073 15.0215 0.787224 14.9847L0.78232 14.9822C0.723314 14.9527 0.452655 14.8171 0.291285 14.5042C0.128165 14.1879 0.128165 13.8122 0.291285 13.4959C0.452656 13.183 0.723315 13.0474 0.782321 13.0179L0.787224 13.0154C0.860073 12.9786 0.943822 12.9453 0.988072 12.9277L0.999687 12.923L5.23038 11.2307L6.92265 7.00005L6.92728 6.98844C6.9449 6.94419 6.97823 6.86044 7.01507 6.78759L7.01753 6.78269C7.04708 6.72368 7.1826 6.45302 7.49552 6.29165ZM7.99969 9.69264L6.95363 12.3078L6.95315 12.309C6.95033 12.3161 6.93782 12.3477 6.9237 12.3786C6.90457 12.4206 6.87062 12.4891 6.81582 12.5653C6.74633 12.662 6.66161 12.7467 6.56497 12.8162C6.48877 12.871 6.42026 12.9049 6.37828 12.9241C6.34728 12.9382 6.3157 12.9507 6.30861 12.9535L6.30741 12.954L3.69227 14.0001L6.30741 15.0461C6.31082 15.0475 6.34489 15.0608 6.37828 15.076C6.42026 15.0952 6.48877 15.1291 6.56497 15.1839C6.66161 15.2534 6.74633 15.3381 6.81582 15.4348C6.87062 15.511 6.90457 15.5795 6.9237 15.6215C6.93782 15.6524 6.95033 15.684 6.95315 15.6911L6.95363 15.6923L7.99969 18.3075L9.04574 15.6923C9.04711 15.6889 9.06046 15.6549 9.07568 15.6215C9.0948 15.5795 9.12876 15.511 9.18356 15.4348C9.25305 15.3381 9.33777 15.2534 9.4344 15.1839C9.51061 15.1291 9.57911 15.0952 9.62109 15.076C9.65449 15.0608 9.68855 15.0475 9.69196 15.0461L12.3071 14.0001L9.69196 12.954L9.69076 12.9535C9.68365 12.9507 9.65208 12.9382 9.62109 12.9241C9.57911 12.9049 9.51061 12.871 9.4344 12.8162C9.33777 12.7467 9.25305 12.662 9.18356 12.5653C9.12876 12.4891 9.0948 12.4206 9.07568 12.3786C9.06155 12.3477 9.04903 12.3161 9.04622 12.309L9.04574 12.3078L7.99969 9.69264Z" fill="currentColor"></path><path d="M20.9997 14C20.9997 13.4477 20.552 13 19.9997 13C19.4474 13 18.9997 13.4477 18.9997 14V16H16.9997C16.4474 16 15.9997 16.4477 15.9997 17C15.9997 17.5523 16.4474 18 16.9997 18H18.9997V20C18.9997 20.5523 19.4474 21 19.9997 21C20.552 21 20.9997 20.5523 20.9997 20V18H22.9997C23.552 18 23.9997 17.5523 23.9997 17C23.9997 16.4477 23.552 16 22.9997 16H20.9997V14Z" fill="currentColor"></path>
                                              </svg>
                                            </div>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="characteristics" v-if="variantItem.subcategory">
                              <div class="characteristics-list">
                                <div v-if="showFieldWrapper" v-for="(field, index) in categoryFields.characters_valid" :key="index"
                                     class="field-wrapper" style="padding-bottom: 16px;">
                                  <div class="field-wrapper-label-wrapper">
                                    <div class="field-wrapper-label">
                                      <span class="field-wrapper-label-text">
                                        {{ field.charcName }}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="field-wrapper-field">
                                    <div class="form-multi-select" data-error="false">
                                      <div class="form-multi-select-field">
                                        <div class="new-search-multi-input">
                                          <div class="new-multi-select-input"
                                               @click="toggleMultiSelectField(index)">
                                            <div class="new-multi-select-input-value-container">
                                              <div class="hidden-measure-value-list"></div>
                                              <div class="selected-tags" v-if="selectedMultiOptions[index].length"
                                                   style="display: flex; gap: 5px">
                                                <div v-for="(option, optIndex) in selectedMultiOptions[index]"
                                                     :key="optIndex" class="multi-select-tag">
                                                  <span class="item-selected-text">{{ option.label }}</span>
                                                  <button @click.stop="removeMultiOption(index, option.value)"
                                                          class="selected-item-remove">
                                                    <svg fill="none" height="16" viewBox="3 3 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                                      <path clip-rule="evenodd" d="M16.4142 15L22.7782 21.364L21.364 22.7782L15 16.4143L8.63604 22.7782L7.22183 21.364L13.5858 15L7.22183 8.63608L8.63604 7.22187L15 13.5858L21.364 7.22187L22.7782 8.63608L16.4142 15Z" fill="#4e4e53" fill-rule="evenodd"></path>
                                                    </svg>
                                                  </button>
                                                </div>
                                              </div>
                                              <input
                                                  v-model="newMultiOptionText[index]"
                                                  autocomplete="off"
                                                  class="new-multi-select-input-input"
                                                  type="text"
                                                  @keyup.enter="addMultiOption(index)"
                                              >
                                            </div>
                                          </div>
                                          <div v-if="isMultiSelectOpen[index] && getMultiSelectOptions(field.value).length"
                                               class="multi-select-dropdown">
                                            <ul class="dropdown-list">
                                              <li v-for="(option, optIndex) in getMultiSelectOptions(field.value)"
                                                  :key="optIndex" class="dropdown-list-item">
                                                <button class="dropdown-option" type="button"
                                                        @click="selectMultiOption(index, option)">
                                                  <div class="barcode-dropdown-option">
                                                    <span class="barcode-dropdown-option-title">
                                                      {{ option.label }}
                                                    </span>
                                                  </div>
                                                </button>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="characteristics-expand">
                                <button class="choose-media btn-settings" type="button" style="width: 100%" @click="openCharacteristicsList">
                                  <span class="caption">{{ showFieldWrapper ? 'Свернуть' : 'Показать все' }}</span>
                                  <svg :class="{ 'rotated': showFieldWrapper }" fill="none" height="12" viewBox="-3 -7 24 24" width="12" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" d="M16.293 0.292969L17.7072 1.70718L9.00008 10.4143L0.292969 1.70718L1.70718 0.292969L9.00008 7.58586L16.293 0.292969Z" fill="#000" fill-rule="evenodd"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div v-if="variantItem.category && variantItem.subcategory" class="variants-sizes">
                              <div class="sizes-old">
                                <div class="sizes-old-title">
                                  <span class="text text-h4-bold text-black" data-name="text">Баркод и цена</span>
                                </div>
                                <div class="sizes-array" id="sizes-array">
                                  <div class="size-row" data-testid="card-sizes-0" id="size-row">
                                    <div class="size-row-price">
                                      <div class="field-wrapper" id="price" style="padding-bottom: 0px;">
                                        <div class="field-wrapper-label-wrapper">
                                          <div class="field-wrapper-label">
                                            <span class="field-wrapper-label-text field-wrapper-label-text-has-tooltip">
                                              Цена, ₽
                                            </span>
                                            <div class="laag-tooltip laag-tooltip-label">
                                              <span class="field-wrapper-label-icon">
                                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                  <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="field-wrapper-field">
                                          <div class="form-input" data-error="false">
                                            <div class="form-input-field">
                                              <div class="input" data-name="SimpleInput">
                                                <input
                                                    autocomplete="off"
                                                    :class="['input-field', variantItem.priceValue === '' ? 'input-field-empty' : '']"
                                                    id="variants[0].sizes[0].price"
                                                    type="text"
                                                    value
                                                    v-model="variantItem.priceValue"
                                                >
                                                <div class="input-button-wrapper" v-if="variantItem.priceValue">
                                                  <button aria-label="remove" class="input-icon-remove" type="button" @click="clearInput">
                                                    <svg fill="none" height="12" viewBox="3 3 24 24" width="12" xmlns="http://www.w3.org/2000/svg">
                                                      <path clip-rule="evenodd" d="M16.4142 15L22.7782 21.364L21.364 22.7782L15 16.4143L8.63604 22.7782L7.22183 21.364L13.5858 15L7.22183 8.63608L8.63604 7.22187L15 13.5858L21.364 7.22187L22.7782 8.63608L16.4142 15Z" fill="#fff" fill-rule="evenodd"></path>
                                                    </svg>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="size-row-skus">
                                      <div class="field-wrapper" id="skus" style="padding-bottom: 0px;">
                                        <div class="field-wrapper-label-wrapper">
                                          <div class="field-wrapper-label">
                                            <span class="field-wrapper-label-text field-wrapper-label-text-has-tooltip">
                                              Баркоды
                                            </span>
                                            <div class="laag-tooltip laag-tooltip-label">
                                              <span class="field-wrapper-label-icon">
                                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                  <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="field-wrapper-field">
                                          <div class="form-barcode-select" data-error="false">
                                            <div class="barcode-select" id="barcode-select">
                                              <div
                                                  v-if="!isDropdownOpen"
                                                  class="barcode-select-selected"
                                                  data-testid="card-sizes-barcode"
                                                  role="button"
                                                  tabindex="-1"
                                                  @click="toggleDropdown"
                                              >
                                                <div class="barcode-select-text">
                                                  {{ selectedOption ? selectedOption.label : 'Выберите опцию' }}
                                                </div>
                                                <div
                                                    v-if="options.length > 1"
                                                    class="barcode-select-additional"
                                                >
                                                  +{{ options.length - 1 }}
                                                </div>
                                              </div>
                                              <!-- Состояние при открытом dropdown -->
                                              <template v-else>
                                                <div class="barcode-select-input-wrapper">
                                                  <input
                                                      autocomplete="off"
                                                      class="barcode-select-field"
                                                      data-testid="card-sizes-barcode"
                                                      id="variants[0].sizes[0].skus"
                                                      max="999999"
                                                      min="0"
                                                      pattern="^[0-9.]"
                                                      type="text"
                                                      v-model="newOptionText"
                                                  >
                                                  <button aria-label="add" class="barcode-select-plus" type="button" @click="addOption">
                                                    <svg fill="none" height="16" viewBox="-2 -2 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                                      <path clip-rule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#5067de" fill-rule="evenodd"></path>
                                                    </svg>
                                                  </button>
                                                </div>
                                                <div v-if="options.length" class="barcode-select-dropdown">
                                                  <ul
                                                      class="dropdown-list"
                                                  >
                                                    <li
                                                        class="dropdown-list-item"
                                                        v-for="option in options"
                                                        :key="option.value"
                                                    >
                                                      <button class="dropdown-option" type="button" @click="selectOption(option)">
                                                        <div class="barcode-dropdown-option">
                                                          <span class="barcode-dropdown-option-title">
                                                            {{ option.label }}
                                                          </span>
                                                          <div aria-label="remove" class="barcode-dropdown-option-button" role="button" @click.stop="removeOption(option.value)">
                                                            <svg fill="none" height="16" viewBox="-2 -1 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                                              <path clip-rule="evenodd" d="M7 0H13C14.1046 0 15 0.89543 15 2V3H18C19.1046 3 20 3.89543 20 5V7C20 8.10457 19.1046 9 18 9H17.9199L17 20C17 21.1046 16.1046 22 15 22H5C3.89543 22 3 21.1046 3.00345 20.083L2.07987 9H2C0.89543 9 0 8.10457 0 7V5C0 3.89543 0.89543 3 2 3H5V2C5 0.89543 5.89543 0 7 0ZM2 5H5H15H18V7H2V5ZM4.08649 9H15.9132L15.0035 19.917L15 20H5L4.08649 9ZM13 2V3H7V2H13Z" fill="#4e4e53" fill-rule="evenodd"></path>
                                                            </svg>
                                                          </div>
                                                        </div>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </template>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="sizes-old-buttons">
                                  <div class="sizes-old-button"></div>
                                  <div class="sizes-old-button">
                                    <div class="choose-media btn-settings" type="button" @click="generateBarcode">
                                      <span class="caption">Сгенерировать баркоды</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-if="variantItem.category && variantItem.subcategory" class="variants-dimensions">
                              <div class="dimensions" id="dimensions">
                                <div class="dimensions-title">
                                  <span class="text text-h4-bold text-black">Габариты упаковки</span>
                                </div>
                                <div class="dimensions-sub-title">
                                  <span class="text text-h5">Если указанные габариты окажутся меньше фактических, будет начислен штраф</span>
                                </div>
                                <div class="dimensions-fields">
                                  <div class="dimensions-field">
                                    <div class="field-wrapper" id="length" style="padding-bottom: 16px;">
                                      <div class="field-wrapper-label-wrapper">
                                        <div class="field-wrapper-label">
                                          <span class="field-wrapper-label-text">
                                            Длина (см)
                                          </span>
                                          <div class="laag-tooltip laag-tooltip-label">
                                            <span class="field-wrapper-label-icon">
                                              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="field-wrapper-field">
                                        <div class="form-input" data-error="false">
                                          <div class="form-input-field">
                                            <div class="input" data-name="SimpleInput">
                                              <input
                                                  autocomplete="off"
                                                  class="input-field input-field-empty"
                                                  inputmode="numeric"
                                                  type="text"
                                                  v-model="variantItem.length"
                                              >
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="dimensions-field">
                                    <div class="field-wrapper" id="width" style="padding-bottom: 16px;">
                                      <div class="field-wrapper-label-wrapper">
                                        <div class="field-wrapper-label">
                                          <span class="field-wrapper-label-text">
                                            Ширина (см)
                                          </span>
                                          <div class="laag-tooltip laag-tooltip-label">
                                            <span class="field-wrapper-label-icon">
                                              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="field-wrapper-field">
                                        <div class="form-input" data-error="false">
                                          <div class="form-input-field">
                                            <div class="input" data-name="SimpleInput">
                                              <input
                                                  autocomplete="off"
                                                  class="input-field input-field-empty"
                                                  inputmode="numeric"
                                                  type="text"
                                                  v-model="variantItem.width"
                                              >
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="dimensions-field">
                                    <div class="field-wrapper" id="height" style="padding-bottom: 16px;">
                                      <div class="field-wrapper-label-wrapper">
                                        <div class="field-wrapper-label">
                                          <span class="field-wrapper-label-text">
                                            Высота (см)
                                          </span>
                                          <div class="laag-tooltip laag-tooltip-label">
                                            <span class="field-wrapper-label-icon">
                                              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path clip-rule="evenodd" d="M2.61292 9.99948H6V15.2333L13.3871 5.99948H10V0.765625L2.61292 9.99948ZM7.33333 8.66615H5.38708L8.66666 4.56667V7.33281H10.6129L7.33333 11.4323V8.66615Z" fill="#6C11C9" fill-rule="evenodd"></path>
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="field-wrapper-field">
                                        <div class="form-input" data-error="false">
                                          <div class="form-input-field">
                                            <div class="input" data-name="SimpleInput">
                                              <input
                                                  autocomplete="off"
                                                  class="input-field input-field-empty"
                                                  inputmode="numeric"
                                                  type="text"
                                                  v-model="variantItem.height"
                                              >
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="dimensions-dimensions">
                                  <div class="separated-charcs">
                                    <div class="field-wrapper" id="Вес товара с упаковкой (г)" style="padding-bottom: 16px;">
                                      <div class="field-wrapper-label-wrapper">
                                        <div class="field-wrapper-label">
                                          <div class="field-wrapper-label-text">Вес товара с упаковкой (г)</div>
                                        </div>
                                      </div>
                                      <div class="field-wrapper-field">
                                        <div class="form-input">
                                          <div class="form-input-field">
                                            <div class="input">
                                              <input
                                                  autocomplete="off"
                                                  class="input-field input-field-empty"
                                                  inputmode="numeric"
                                                  type="text"
                                                  v-model="variantItem.weightWithPack"
                                              >
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-if="variantItem.category && variantItem.subcategory" class="variants-certificates">
                              <section class="certificates" id="documents">
                                <div class="certificate-header">
                                  <div class="laag-tooltip">
                                    <div class="certificate-header-title">
                                      <span class="text text-l-bold text-black">Документ, подтверждающий качество</span>
                                    </div>
                                  </div>
                                  <span class="text text-body-m">
                                    Укажите данные сертификата или декларации соответствия. Мы проверим их — если всё в порядке, добавим на товар значок «Документы проверены»
                                  </span>
                                  <div class="certificate-header-process-notify">
                                    <svg fill="none" height="24" viewBox="-1 -1 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                      <path clip-rule="evenodd" d="M0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11ZM20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM11.0003 16.9983C11.5528 16.9983 12.0007 16.5506 12.0007 15.9983C12.0007 15.4461 11.5528 14.9983 11.0003 14.9983C10.4479 14.9983 10 15.4461 10 15.9983C10 16.5506 10.4479 16.9983 11.0003 16.9983ZM12.0036 4.99835H10.003V12.9983H12.0036V4.99835Z" fill="#FF773C" fill-rule="evenodd"></path>
                                    </svg>
                                    <span class="text text-body-s text-bold">Обычно проверка занимает около 3 дней</span>
                                  </div>
                                </div>
                                <div class="certificates-type">
                                  <span class="text text-body-m">Тип</span>
                                  <div class="laag-tooltip" ref="declarationSelect">
                                    <!-- Поле выбора -->
                                    <div class="select" @click="toggleDeclarationDropdown">
                                      <input
                                          class="select-input"
                                          readonly
                                          :value="selectedDeclaration.label"
                                      >
                                      <div class="select-icon-wrapper">
                                        <button class="select-icon" type="button">
                                          <svg fill="none" height="24" viewBox="-3 -7 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <path clip-rule="evenodd" d="M16.293 0.292969L17.7072 1.70718L9.00008 10.4143L0.292969 1.70718L1.70718 0.292969L9.00008 7.58586L16.293 0.292969Z" fill="#4e4e53" fill-rule="evenodd"></path>
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    <!-- Выпадающий список -->
                                    <div v-if="isDeclarationDropdownOpen" class="select-dropdown">
                                      <ul class="dropdown-list">
                                        <li class="dropdown-list-item"
                                            v-for="option in declarationOptions"
                                            :key="option.value">
                                          <button class="dropdown-option" type="button" @click="selectDeclarationOption(option)">
                                            {{ option.label }}
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div class="certificate-number">
                                  <span class="text text-body-m">
                                    Номер
                                  </span>
                                  <div class="certificate-number-input-wrapper">
                                    <div class="laag-tooltip">
                                      <div class="form-simple-input">
                                        <div class="simple-input">
                                          <input
                                              autocomplete="off"
                                              class="simple-input-field"
                                              type="text"
                                              v-model="variantItem.certificateNumber"
                                          >
                                        </div>
                                      </div>
                                    </div>
                                    <div class="certificate-number-label" aria-label="number-label" role="button"></div>
                                  </div>
                                  <div class="certificate-number-certificate-description">
                                    <span class="text text-body-s">В зависимости от типа документа вид номера может меняться.</span>
                                    <div class="certificate-number-details">
                                      <a class="button-link-text text-blue" target="_blank" href="https://static-basket-02.wbbasket.ru/vol20/portal/education/instruction/Proverka_svedenii_sertifikatov_i_deklaratsii_o_sootvetstvii.pdf">
                                        <span class="text text-body-s text-blue">Подробнее</span>
                                      </a>
                                      <span class="text text-body-s" style="margin-left: 4px;">о типах документов, подтверждающих качество</span>
                                    </div>
                                  </div>
                                </div>
                                <div class="certificates-date">
                                  <div class="certificates-date-start">
                                    <span class="text text-body-m">Действует от</span>
                                    <div class="laag-tooltip">
                                      <div class="simple-input">
                                        <input
                                            autocomplete="off"
                                            class="simple-input-field"
                                            placeholder="ДД.ММ.ГГГГ"
                                            type="text"
                                            v-model="variantItem.datefrom"
                                        >
                                      </div>
                                    </div>
                                  </div>
                                  <div class="certificates-date-end">
                                    <span class="text text-body-m">Действует до</span>
                                    <div class="laag-tooltip">
                                      <div class="simple-input">
                                        <input
                                            autocomplete="off"
                                            class="simple-input-field"
                                            :class="{ 'simple-input-field-disabled': variantItem.isPermanent }"
                                            :disabled="variantItem.isPermanent"
                                            placeholder="ДД.ММ.ГГГГ"
                                            type="text"
                                            v-model="variantItem.databefore"
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="checkboxWithLabel" style="align-items: center;">
                                  <div class="checkboxWrapper">
                                    <input class="control" name="variants[0].isAdult" type="checkbox" style="cursor: pointer;" v-model="variantItem.isPermanent">
                                  </div>
                                  <label class="content">
                                    <span class="label">Бессрочный</span>
                                  </label>
                                </div>
                              </section>
                            </div>
                            <div class="rich-content-v2">
                              <div class="rich-content-v2-text-wrapper">
                                <div class="rich-content-v2-title">
                                  <div class="rich-content-v2-icon-wrapper">
                                    <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                      <path clip-rule="evenodd" d="M15.8333 2.5C15.8333 2.5 15.8333 2.5 15.8333 2.5C16.2936 2.5 16.6667 2.1269 16.6667 1.66667C16.6667 1.66667 16.6667 1.66667 16.6667 1.66667V1.66667C16.6667 1.66667 16.6667 1.66667 16.6667 1.66666C16.6667 1.20643 16.2936 0.833332 15.8333 0.833332C15.8333 0.833332 15.8333 0.833332 15.8333 0.833332H4.16667C4.16667 0.833332 4.16667 0.833332 4.16667 0.833332C3.70643 0.833332 3.33333 1.20643 3.33333 1.66666C3.33333 1.66667 3.33333 1.66667 3.33333 1.66667V1.66667C3.33333 1.66667 3.33333 1.66667 3.33333 1.66667C3.33333 2.1269 3.70643 2.5 4.16667 2.5C4.16667 2.5 4.16667 2.5 4.16667 2.5H15.8333ZM15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667ZM5.83333 14.1667C5.04766 14.1667 4.65482 14.1667 4.41074 13.9226C4.16667 13.6785 4.16667 13.2857 4.16667 12.5V7.5C4.16667 6.71432 4.16667 6.32149 4.41074 6.07741C4.65482 5.83333 5.04766 5.83333 5.83334 5.83333H14.1667C14.9523 5.83333 15.3452 5.83333 15.5893 6.07741C15.8333 6.32149 15.8333 6.71432 15.8333 7.5V12.5C15.8333 13.2857 15.8333 13.6785 15.5893 13.9226C15.3452 14.1667 14.9523 14.1667 14.1667 14.1667H5.83333ZM15.8333 17.5C16.2936 17.5 16.6667 17.8731 16.6667 18.3333V18.3333C16.6667 18.7936 16.2936 19.1667 15.8333 19.1667H4.16667C3.70643 19.1667 3.33333 18.7936 3.33333 18.3333V18.3333C3.33333 17.8731 3.70643 17.5 4.16667 17.5H15.8333Z" fill="#9A41FE" fill-rule="evenodd"></path>
                                    </svg>
                                    <span class="text text-bold text-purple text-v2">Рич-контент</span>
                                  </div>
                                </div>
                                <div class="rich-content-v2-description">
                                  <span class="text text-black">Блок с картинками и видео в описании карточки товара. Используйте, чтобы нагляднее показать товар и его функции</span>
                                </div>
                              </div>
                              <button class="rich-btn" disabled type="button">
                                <span class="caption">Редактор станет доступен после публикации товара</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-form-actions">
                      <div class="form-actions">
                        <div class="form-actions-cancel" style="margin-right: 16px;">
                          <router-link to="/">
                            <button class="action-back" type="button">
                              <span class="back-btn-text">
                                К списку товаров
                              </span>
                            </button>
                          </router-link>
                        </div>
                        <div class="form-actions-submit">
                          <button class="submit-action-button" type="button" @click="submitForm">
                            <span class="submit-action-btn-text">
                              Создать и завершить
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="card-form-widgets">
                    <div class="widget-wrapper">
                      <div class="widget-wrapper-header-wrapper" @click="toggleWidgetContent">
                        <div class="widget-wrapper-header" :class="{'widget-opened': isWidgetContentVisible}">
                          <div class="widget-wrapper-icon">
                            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.5013 10.832H12.5013C12.043 10.832 11.668 10.457 11.668 9.9987C11.668 9.54036
                  12.043 9.16536 12.5013 9.16536H17.5013C17.9596 9.16536 18.3346 9.54036 18.3346 9.9987C18.3346
                  10.457 17.9596 10.832 17.5013 10.832ZM17.5013 5.83203H12.5013C12.043 5.83203 11.668 6.20703
                  11.668 6.66536C11.668 7.1237 12.043 7.4987 12.5013 7.4987H17.5013C17.9596 7.4987 18.3346 7.1237
                  18.3346 6.66536C18.3346 6.20703 17.9596 5.83203 17.5013 5.83203ZM12.5013 14.1654H17.5013C17.9596
                  14.1654 18.3346 13.7904 18.3346 13.332C18.3346 12.8737 17.9596 12.4987 17.5013 12.4987H12.5013C12.043
                  12.4987 11.668 12.8737 11.668 13.332C11.668 13.7904 12.043 14.1654 12.5013 14.1654ZM10.0013
                  7.4987V12.4987C10.0013 13.4154 9.2513 14.1654 8.33464 14.1654H3.33464C2.41797 14.1654 1.66797
                  13.4154 1.66797 12.4987V7.4987C1.66797 6.58203 2.41797 5.83203 3.33464 5.83203H8.33464C9.2513
                  5.83203 10.0013 6.58203 10.0013 7.4987ZM8.2513 11.832L7.2013 10.432C7.03464 10.2154 6.70964 10.207
                  6.53464 10.4237L5.41797 11.882L4.70964 11.0237C4.54297 10.8154 4.2263 10.8237 4.05964 11.032L3.44297
                  11.8237C3.2263 12.0987 3.4263 12.4987 3.76797 12.4987H7.91797C8.25964 12.4987 8.45964 12.107 8.2513
                  11.832Z" fill="#6C11C9"></path>
                            </svg>
                          </div>
                          <div class="widget-wrapper-title">
                            <span class="widget-wrapper-title-text">
                              Требования к медиа
                            </span>
                          </div>
                          <div class="widget-wrapper-toggle">
                            <svg :class="{'rotated': isWidgetContentVisible}" fill="none" height="16" viewBox="-3 -7 24 24"
                                 width="16" xmlns="http://www.w3.org/2000/svg">
                              <path clip-rule="evenodd" d="M16.293 0.292969L17.7072 1.70718L9.00008 10.4143L0.292969 1.70718L1.70718 0.292969L9.00008 7.58586L16.293 0.292969Z" fill="#4e4e53" fill-rule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="widget-wrapper-content" v-show="isWidgetContentVisible">
                        <div class="requirements-container">
                          <div class="requirements-section">
                            <h4 class="requirements-title">Требования к фото</h4>
                            <div class="requirement-name">Формат</div>
                            <div class="requirement-text">JPG, PNG, WEBP</div>
                            <div class="requirement-name">Разрешение</div>
                            <div class="requirement-text">от 700×900 px</div>
                            <div class="requirement-name">Качество сжатия</div>
                            <div class="requirement-text">от 65%</div>
                            <div class="requirement-name">Размер</div>
                            <div class="requirement-text">до 10 Мб</div>
                            <div class="requirement-name">Количество</div>
                            <div class="requirement-text">до 30 шт</div>
                            <h4 class="requirements-title" style="grid-column: span 2; margin-bottom: 8px; margin-top: 20px;">
                              Требования к видео</h4>
                            <div class="requirement-name">Формат</div>
                            <div class="requirement-text">MOV, MP4</div>
                            <div class="requirement-name">Размер</div>
                            <div class="requirement-text">до 50 Мб</div>
                            <div class="requirement-name">Количество</div>
                            <div class="requirement-text">1 шт</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="layers" style="position: absolute; top: 0px; left: 0px; right: 0px;">
    <div v-if="isCategories" class="supplier-subject-select-dropdown" style="will-change: top, left, width, height; position: absolute; top: 334px; left: 700px;">
      <div class="supplier-subject-select-header">
        <div class="subject-dropdown-header">
          <div class="subject-dropdown-header-content">
            <div class="subject-dropdown-header-text">
            <span class="text text-h5 text-black lil-spacing">
              Если категория кардинально отличается от фото, наименования и описания товара — мы можем заблокировать такой товар, пока всё не проверим
            </span>
            </div>
            <div class="subject-dropdown-header-link">
              <a class="button-link-blue" href="https://static-basket-02.wbbasket.ru/vol20/content-files/0.0.3/rules_category.pdf">
                <span class="text text-blue">Примеры отличий — в конце документа</span>
              </a>
            </div>
          </div>
          <div class="subject-dropdown-header-icon"></div>
        </div>
      </div>
      <div class="tree-select">
        <div class="tree-select-input-row">
          <div class="tree-select-input">
            <div class="new-input">
              <div class="new-input-input-wrapper">
                <input
                    class="new-input-field new-input-field-searching new-input-field-small"
                    id="tree-select-input"
                    autocomplete="off"
                    max="999999"
                    min="0"
                    name="tree-select-input"
                    pattern="^[0-9.]"
                    type="search"
                    value
                    v-model="searchTerm"
                >
                <div class="new-input-button-wrapper">
                  <button aria-label="search" class="new-input-icon-remove new-input-icon-remove-search" type="button">
                    <svg fill="none" height="16" viewBox="-2 -1 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929L18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" fill="#4e4e53" fill-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tree-select-button">
            <button class="tree-select-cancel-button" type="button" @click="isCategories = false">Отменить</button>
          </div>
        </div>
        <div class="tree-select-columns">
          <div class="tree-select-column">
            <ul class="render-column" id="category">
              <li v-for="(category, catIndex) in filteredCategories" :key="category.id">
                <button class="item-option"
                        :data-testid="`category-button-${catIndex}`"
                        :class="{ 'item-option-selected': selectedCategory && selectedCategory.id === category.id }"
                        :disabled="selectedCategory && selectedCategory.id === category.id"
                        @click="selectCategory(category)">
                  {{ category.name }}
                </button>
              </li>
            </ul>
          </div>
          <div class="tree-select-column">
            <ul class="render-column" id="subcategory">
              <li v-for="(subcategory, subIndex) in subcategories" :key="subcategory.id">
                <button class="item-option"
                        :data-testid="`subcategory-button-${subIndex}`"
                        @click="selectSubcategory(subcategory)">
                  {{ subcategory.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="tree-select-blur"></div>
      </div>
    </div>
  </div>
</template>

<script>
import categoryFieldsData from '../assets/categoryFields.json';
import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000';

export default {
  name: 'AddProduct',
  data() {
    return {
      product: {
        rating: 0,
      },
      variantItem: {
        title: '',
        vendor: '',
        description: '',
        category: null,
        subcategory: null,
        eighteen: false,
        priceValue: '',
        width: '',
        height: '',
        length: '',
        weightWithPack: '',
        certificateNumber: '',
        datefrom: null,
        databefore: null,
        isPermanent: false,
        brand: '',
        selectedColor: []
      },
      brands: [
        'Nike',
        'Adidas',
        'Puma',
        'Reebok',
        'Under Armour',
        'JBL',
        'Apple',
        'Samsung',
        'Hugo'
      ],
      declarationOptions: [
        { value: 'certificate', label: 'Сертификат соответствия' },
        { value: 'declaration', label: 'Декларация соответствия' }
      ],
      multiSelectOptions: [
        { value: 'option1', label: 'Характеристика 1' },
        { value: 'option2', label: 'Характеристика 2' },
        { value: 'option3', label: 'Характеристика 3' }
      ],
      // Импортированный JSON с данными категории
      categoryFields: categoryFieldsData,
      // Инициализируем массивы нужной длины
      isMultiSelectOpen: categoryFieldsData.characters_valid.map(() => false),
      selectedMultiOptions: categoryFieldsData.characters_valid.map(() => []),
      newMultiOptionText: categoryFieldsData.characters_valid.map(() => ''),
      searchMultiTerm: '',
      // По умолчанию выбран «Декларация соответствия»
      selectedDeclaration: { value: 'declaration', label: 'Декларация соответствия' },
      isDeclarationDropdownOpen: false,
      isWidgetContentVisible: false,
      previewFiles: [],
      isDragging: false,
      isDropdownOpen: false,
      isEditingOption: false,
      newOptionText: '',
      showFieldWrapper: false,
      options: [],
      selectedOption: '8796',
      isHovered: false,
      hoveredIndex: null,
      textAreaHeight: 130,
      isCategories: false,
      searchTerm: '',
      categories: [],
      subcategories: [],
      selectedCategory: null,    // Выбранная категория
      selectedSubcategory: null  // Выбранная подкатегория (если необходимо)
    }
  },
  methods: {
    getMultiSelectOptions(valueString) {
      if (!valueString) return [];
      return valueString.split(',').map(item => {
        const trimmed = item.trim();
        return {
          value: trimmed.toLowerCase().replace(/\s+/g, '-'),
          label: trimmed
        };
      });
    },
    toggleMultiSelectField(index) {
      this.isMultiSelectOpen[index] = !this.isMultiSelectOpen[index];
    },
    toggleMultiSelect() {
      this.isMultiSelectOpen = !this.isMultiSelectOpen;
    },
    addMultiOption(index) {
      const text = this.newMultiOptionText[index].trim();
      if (!text) return;
      const newOption = {
        value: text.toLowerCase().replace(/\s+/g, '-'),
        label: text
      };
      // Проверяем, существует ли уже вариант (из JSON)
      const exists = this.getMultiSelectOptions(this.categoryFields.characters_valid[index].value)
          .some(opt => opt.label === text);
      if (!exists) {
        // Если его нет, добавляем в исходное значение (это можно менять по логике)
        let currentVal = this.categoryFields.characters_valid[index].value;
        currentVal = currentVal ? `${currentVal},${text}` : text;
        this.categoryFields.characters_valid[index].value = currentVal;
      }
      // Если вариант ещё не выбран, добавляем его в список выбранных опций
      if (!this.selectedMultiOptions[index].some(opt => opt.value === newOption.value)) {
        this.selectedMultiOptions[index].push(newOption);
      }
      // Очищаем поле ввода и закрываем выпадающий список
      this.newMultiOptionText[index] = '';
      this.isMultiSelectOpen[index] = false;
    },

    selectMultiOption(index, option) {
      if (!this.selectedMultiOptions[index].some(opt => opt.value === option.value)) {
        this.selectedMultiOptions[index].push(option);
      }
      this.isMultiSelectOpen[index] = false;

      // Обновляем только если это поле "Цвет"
      if (this.categoryFields.characters_valid[index]?.charcName === 'Цвет') {
        this.variantItem.selectedColor = this.selectedMultiOptions[index].map(opt => opt.label);
      }
    },

    removeMultiOption(index, value) {
      this.selectedMultiOptions[index] = this.selectedMultiOptions[index].filter(opt => opt.value !== value);

      // Обновляем цвет если это соответствующее поле
      if (this.categoryFields.characters_valid[index]?.charcName === 'Цвет') {
        this.variantItem.selectedColor = this.selectedMultiOptions[index].map(opt => opt.label);
      }
    },
    openCharacteristicsList() {
      this.showFieldWrapper = !this.showFieldWrapper;
    },
    generateBrand() {
      const randomIndex = Math.floor(Math.random() * this.brands.length);
      this.variantItem.brand = this.brands[randomIndex];
    },
    toggleDeclarationDropdown() {
      this.isDeclarationDropdownOpen = !this.isDeclarationDropdownOpen;
    },
    selectDeclarationOption(option) {
      this.selectedDeclaration = option;
      this.isDeclarationDropdownOpen = false;
    },
    generateBarcode() {
      let barcode = '';
      const digits = '0123456789';
      // Генерируем строку из 13 случайных цифр
      for (let i = 0; i < 13; i++) {
        barcode += digits.charAt(Math.floor(Math.random() * digits.length));
      }
      // Создаём объект опции с баркодом
      const newBarcodeOption = { value: barcode, label: barcode };
      // Добавляем новый баркод в начало массива options
      this.options.unshift(newBarcodeOption);
      // Устанавливаем его как выбранную опцию, чтобы сразу отобразить
      this.selectedOption = newBarcodeOption;
    },
    getRatingStyle(rating) {
      const numericRating = parseFloat(rating);
      if (numericRating === 10) {
        return {
          backgroundColor: '#f7f7fa',
          color: '#067b00'
        };
      } else if (numericRating > 7 && numericRating < 10) {
        return {backgroundColor: '#ff8058'};
      } else if (numericRating == 0) {
        return {
          backgroundColor: '#f0f0f3',
          color: '#767386'
        }
      } else {
        return {backgroundColor: '#f96666'};
      }
    },
    toggleWidgetContent() {
      this.isWidgetContentVisible = !this.isWidgetContentVisible;
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleDragOver(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    handleDragLeave(e) {
      e.preventDefault();
      this.isDragging = false;
    },
    handleDrop(e) {
      this.isDragging = false;
      const files = e.dataTransfer.files;
      if (files.length) {
        this.handleFileUpload({ target: { files } });
      }
    },
    // Переключение видимости выпадающего списка
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.$nextTick(() => {
          const selectEl = this.$el.querySelector('#barcode-select');
          const dropdownEl = this.$el.querySelector('.barcode-select-dropdown');
          if (selectEl && dropdownEl) {
            const rect = selectEl.getBoundingClientRect();

            // Проверяем, достаточно ли места снизу
            const spaceBelow = window.innerHeight - rect.bottom;
            if (spaceBelow < dropdownEl.offsetHeight) {
              dropdownEl.style.top = 'auto';
              dropdownEl.style.bottom = '100%';
            } else {
              dropdownEl.style.top = 'calc(100% + 5px)';
              dropdownEl.style.bottom = 'auto';
            }
          }
        });
      }
    },
    editOption() {
      // Заполняем поле ввода значением первой опции
      if (this.options.length) {
        this.newOptionText = this.options[0].label;
        this.isEditingOption = true;
      }
    },
    // Метод добавления (или редактирования) опции
    addOption() {
      const text = this.newOptionText.trim();
      if (text === '') return;

      if (this.isEditingOption && this.options.length) {
        // Если редактируется существующая категория, заменяем первую опцию
        this.options.splice(0, 1, { value: text, label: text });
      } else {
        // Если опций ещё нет или режим редактирования не включён, добавляем новую опцию в начало
        this.options.unshift({ value: text, label: text });
      }

      this.newOptionText = '';
      this.isEditingOption = false;
    },
    // Пример выбора опции из выпадающего списка
    selectOption(option) {
      console.log('Выбрана опция:', option);
      this.selectedOption = option;
      // Дополнительная логика выбора...
      this.isDropdownOpen = false;
    },
    // Модифицированный метод загрузки файлов
    handleFileUpload(event) {
      const files = event.target?.files || event.dataTransfer?.files;
      if (!files || files.length === 0) return;

      Array.from(files).forEach(file => {
        if (!file.type.match(/(image\/|video\/).*/)) {
          console.warn('Неподдерживаемый тип файла:', file.type);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewFiles.push({
            file,
            preview: e.target.result,
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      });
    },
    generateVendorCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomPart = '';
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPart += characters[randomIndex];
      }
      this.variantItem.vendor = 'wb' + randomPart;
    },
    updateHeight() {
      this.textAreaHeight = this.$refs.textarea.clientHeight;
    },
    // Выбор категории: сохраняем выбранную категорию и сбрасываем выбранную подкатегорию
    selectCategory(category) {
      // Сохраняем выбранную категорию
      this.selectedCategory = category;
      // Сбрасываем выбранную подкатегорию (если ранее была выбрана)
      this.selectedSubcategory = null;
      // Выполняем GET-запрос для получения подкатегорий по выбранной категории.
      axios.get(`${baseURL}/api/catalogss?sub_name=${encodeURIComponent(category.name)}`)
          .then(response => {
            // Предполагается, что API возвращает JSON вида:
            // [ { "id": 1, "name": "Кроссовки" } ]
            this.subcategories = response.data;
            this.subcategories.forEach(subcat => {
              console.log(`Subcategory - ID: ${subcat.id}, Name: ${subcat.name}`);
            });
          })
          .catch(error => {
            console.error('Ошибка загрузки подкатегорий:', error);
          });

      // Если у вас используется позиционирование выпадающего списка, можно обновить позицию:
      this.updateDropdownPosition();
    },
    // Выбор подкатегории: сохраняем выбранную подкатегорию, записываем данные в variantItem и закрываем попап
    async selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory;
      this.variantItem.category = this.selectedCategory;
      this.variantItem.subcategory = subcategory;

      try {
        const response = await axios.get(`${baseURL}/api/catalogs/${subcategory.id}`);
        this.categoryFields = response.data;
        // Сбрасываем выбранные значения при смене подкатегории
        this.selectedMultiOptions = response.data.characters_valid.map(() => []);
        this.newMultiOptionText = response.data.characters_valid.map(() => '');
      } catch (error) {
        console.error('Ошибка загрузки характеристик:', error);
      }

      this.isCategories = false;
      this.selectedMultiOptions = response.data.characters_valid.map(() => []);
      this.newMultiOptionText = response.data.characters_valid.map(() => '');
    },
    updateDropdownPosition() {
      if (this.isCategories) {
        const button = document.querySelector('#supplier-subject-select-select-button button');
        if (button) {
          const rect = button.getBoundingClientRect();
          const layers = document.querySelector('#layers');
          if (layers) {
            layers.style.top = `${rect.bottom + window.scrollY}px`;
            layers.style.left = `${rect.left + window.scrollX}px`;
          }
        }
      }
    },
    clearInput() {
      this.variantItem.priceValue = '';
    },
    removeOption(value) {
      this.options = this.options.filter(option => option.value !== value);
    },
    submitForm() {
      // Если выбран чекбокс "Бессрочный", то документ считается заполненным, а databefore равен "permanent".
      // Иначе проверяем, что все три поля заполнены; если хотя бы одно из них пустое, то quality_document будет false.
      const isPermanent = this.variantItem.isPermanent;
      const qualityDocument = isPermanent
          ? true
          : (this.variantItem.certificateNumber && this.variantItem.datefrom && this.variantItem.databefore ? true : false);
      const databeforeValue = isPermanent ? '' : (this.variantItem.databefore || '');

      const colorIndex = this.categoryFields.characters_valid.findIndex(
          field => field.charcName === 'Цвет'
      );

      let colorValue = '';

      if (colorIndex !== -1) {
        // Если для поля «Цвет» выбраны варианты (из выпадающего списка)
        if (this.selectedMultiOptions[colorIndex] && this.selectedMultiOptions[colorIndex].length) {
          // Объединяем выбранные варианты в строку через запятую
          colorValue = this.selectedMultiOptions[colorIndex].map(opt => opt.label).join(',');
        } else {
          // Если ничего не выбрано, можно взять значение из characterValues
          colorValue = '';
        }
      }

      const formData = {
        name: this.variantItem.title || '',
        category: this.variantItem.subcategory ? this.variantItem.subcategory.id : '',
        eighteen: this.variantItem.eighteen,
        characters_in: this.categoryFields.characters_valid.map((field, index) => {
          const selectedOptions = this.selectedMultiOptions[index] || [];
          return {
            value: selectedOptions.map(opt => opt.label).join(', '),
            charcName: field.charcName,
            unitName: 'г' // Используйте field.unitName, если доступно
          };
        }),
        image: this.previewFiles.map(file => ({
          path: file.preview || ''
        })),
        articul: this.variantItem.vendor || '',
        brand: this.variantItem.brand || '',
        description: this.variantItem.description || '',
        price: this.variantItem.priceValue || '',
        Barcodes: this.options.map(option => option.value).join(','),
        length: this.variantItem.length || '',
        Width: this.variantItem.width || '',
        Height: this.variantItem.height || '',
        Weight_product_with_pack: this.variantItem.weightWithPack || '',
        quality_document: qualityDocument,
        quality_number: this.variantItem.certificateNumber || '',
        datafrom: this.variantItem.datefrom || '',
        databefore: databeforeValue
      };

      console.log(JSON.stringify(formData, null, 2));

      axios.post(`${baseURL}/api/product`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            console.log('Product added successfully:', response.data);
            // Дополнительные действия при успехе
            // Например, редирект или очистка формы:
            this.$router.push('/');
            // Или сброс полей:
            // Object.assign(this.$data, this.$options.data());
          })
          .catch(error => {
            console.error('Error adding product:', error);
            // Показ ошибки пользователю
            alert('Ошибка при сохранении товара: ' + error.message);
          });
    }
  },
  beforeUnmount() {
    this.previewFiles = [];
  },
  computed: {
    textareaStyle() {
      return {
        resize: 'vertical',
        width: '100%',
        minHeight: '130px',
        maxHeight: '650px',
        background: 'transparent',
        margin: '0px',
        caretColor: 'rgb(0, 0, 0)',
        position: 'absolute',
        height: Math.max(this.textAreaHeight, 130) + 'px'
      }
    },
    filteredCategories() {
      if (!this.searchTerm) {
        return this.categories;
      }
      return this.categories.filter(category =>
          category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    selectedCategorySubcategories() {
      return this.selectedCategory ? this.selectedCategory.subcategories : [];
    }
  },
  mounted() {
    document.addEventListener('click', this.boundHandleClickOutside);

    this.$nextTick(() => {
      this.updateHeight();
    });
    const textareaEl = this.$refs.textarea;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.textAreaHeight = Math.max(entry.contentRect.height, 130);
      }
    });
    resizeObserver.observe(textareaEl);

    const colorIndex = this.categoryFields.characters_valid.findIndex(
        field => field.charcName === 'Цвет'
    );

    if (colorIndex > -1) {
      this.variantItem.selectedColor = this.selectedMultiOptions[colorIndex].map(opt => opt.label);
    }

    window.addEventListener('scroll', this.updateDropdownPosition);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateDropdownPosition);
  },
  created() {
    axios.get(`${baseURL}/api/catalogs?fields=id,name,sub_name`)
        .then(response => {
          this.categories = response.data.filter(category => category.sub_name === null);
        })
        .catch(error => {
          console.error('Ошибка загрузки категорий:', error);
        });

    // Остальной ваш код, например:
    document.addEventListener('click', this.boundHandleClickOutside);

    this.$nextTick(() => {
      this.updateHeight();
    });
  }
}
</script>


<style scoped>
:root {
  --header-height: 60px;
  --footer-height: 0;
}

.layout-view {
  position: relative;
}

.app-content {
  background-color: #f7f7fa;
  box-sizing: border-box;
  min-height: calc(100vh - var(--header-height, 0px) - var(--footer-height, 0px));
  position: relative;
  width: 100%;
  padding-top: var(--header-height);
}

.base-page-layout {
  background-color: #f0f0f3;
  box-sizing: border-box;
  height: 100%;
  min-height: 100vh;
  padding: 12px 24px;
}

.card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.add-product-components {
  display: grid;
  grid-template-columns: 300px minmax(0, 1240px) 300px;
  gap: 16px;
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.add-product-components::-webkit-scrollbar {
  display: none;
}

.card-form-variants {
  position: sticky;
  top: 50px;
  height: fit-content;
  align-self: start;
  max-width: 300px;
}

.variants-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.variants-option {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 384px;
  max-width: 300px;
  overflow: auto;
  height: 192px;
  background-color: #f7f7fa;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.variant-item {
  border: 1px solid #0000;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 192px;
  min-height: 192px;
  min-width: 300px;
  padding: 12px;
  position: relative;
  width: 100%;
}

.variant-item-image {
  border: .5px solid #f0f0f3;
  border-radius: 6px;
  height: 110px;
  position: relative;
  width: 76px;
}

.variant-item-image-empty {
  align-items: center;
  background: #f0f0f3;
  border: .5px solid #e3e4ea;
  border-radius: 6px;
  display: flex;
  height: 110px;
  justify-content: center;
  width: 76px;
}

.variant-item-content {
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  margin-left: 12px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.colorTag {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  max-width: 76px;
  display: inline-block;
}

.rating-tag {
  align-items: center;
  border-radius: 6px;
  display: inline-block;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  font-weight: 550;
  height: 24px;
  line-height: 16px;
  padding: 4px 8px;
  background-color: #ff8058;
  color: #fff;
  margin-bottom: 5px;
  width: fit-content;
}

.variant-item-content-title {
  color: #000;
  font-family: latobold, arial, sans-serif;
  font-size: 13px;
  height: 16px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-weight: 600;
}

.variant-item-content-vendor {
  color: #77767e;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  height: 16px;
  line-height: 16px;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ----------WIDGET--------- */

.card-form-widgets {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: fit-content;
  max-width: 300px;
  position: sticky;
  top: 50px;
}

.widget-wrapper {
  min-width: 300px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  width: 300px;
}

.widget-wrapper-header-wrapper {
  padding: 10px 10px 0;
}

.widget-wrapper-icon {
  margin-right: 12px;
  display: flex;
}

.widget-wrapper-header {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  padding-bottom: 10px;
}

.widget-wrapper-toggle {
  display: flex;
  height: 16px;
  margin-left: auto;
}

.widget-wrapper-content {
  display: block;
  padding: 12px;
}

.rotated {
  transform: rotate(180deg);
}

.requirements-container {
  display: grid;
  gap: 16px;
}

.requirements-section {
  column-gap: 12px;
  display: grid;
  grid-template-columns: max-content 1fr;
  max-width: 100%;
  width: max-content;
}

.requirements-title {
  font-weight: 500;
  line-height: 20px;
  color: #000;
  grid-column: span 2;
  margin-bottom: 8px;
}

.requirement-name {
  font-size: 13px;
  line-height: 16px;
  color: #767386;
  min-width: max-content;
}

.requirement-text {
  font-size: 13px;
  line-height: 16px;
  color: #000;
}

.widget-wrapper-header.widget-opened {
  border-bottom: 1px solid #f0f0f3;
}

/* ---------MIDDLE FORM----------- */

.card-form-form {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
}

.card-form-subject-selector {
  display: block;
  margin-bottom: 12px;
}

.subject-selector {
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}

.subject-selector-warning {
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 10px 18px;
}

.subject-selector-warning-icon {
  align-items: center;
  display: flex;
}

.subject-selector-warning-text {
  margin-left: 8px;
}

/* ---------СОХРАНЕНИЕ С ВЫХОДОМ СНИЗУ--------- */

.card-form-actions {
  max-width: min(1240px, max(345px, calc(100vw - 680px)));
  width: 100%;
  background: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  bottom: 0;
  box-shadow: 0 7px 20px 0 #0000001a;
  box-sizing: border-box;
  height: 64px;
  padding: 12px 24px;
  position: fixed;
  z-index: 50;

  /* Центрирование контента */
  left: 50%;
  transform: translateX(-50%);
}

.form-actions {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.action-back {
  gap: 6px;
  height: 44px;
  padding: 12px 16px;
  align-items: center;
  background-color: #4a4a5914;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
  outline: none;
  overflow: hidden;
  position: relative;
  transition-duration: .2s;
  transition-property: background-color, color;
}

.submit-action-button {
  gap: 6px;
  height: 44px;
  padding: 12px 16px;
  align-items: center;
  background-color: #9a41fe;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
  outline: none;
  overflow: hidden;
  position: relative;
  transition-duration: .2s;
  transition-property: background-color, color;
}

/* ----------MIDDLE FORM FORM----------*/

.card-form-form-variants {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 100px;
  max-width: 1280px;
  padding: 20px 24px 24px;
}

.variants {
  display: flex;
  flex-direction: row;
}

.variants-variant {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
}

.variants-media {
  max-width: 312px;
  min-width: 312px;
}

.variants-variant-fields {
  overflow: hidden;
  width: 100%;
}

.card-media-files-editor {
  display: flex;
  flex-direction: column;
}

.media-dnd-files {
  display: inline-block;
  position: relative;
  width: 100%;
}

.card-media-files-editor-open-photo {
  margin-bottom: 12px;
  margin-top: 12px;
}

.card-media-files-editor-studio {
  margin-bottom: 12px;
}

.card-media-files-tag-edit {
  margin-bottom: 32px;
}

/* ----------ОКНО ЗАГРУЗКИ ФОТО-------- */

.uploader-button {
  align-items: center;
  border: 1px dashed #d1cfd7;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: center;
  margin-bottom: 4px;
  width: 312px;
}

.card-media-files-editor-media-files {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.uploader-button-button-icon {
  align-items: center;
  background: #0000;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 32px;
  position: relative;
  width: 100%;
  border-radius: 16px;
}

.uploader-button-button-icon:hover {
  background: #f0f0f3;
}

.media-upload-input {
  display: none;
}

.uploader-button-add {
  color: #000;
  font-family: latobold, arial, sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 24px;
  margin-top: 32px;
}

.uploader-button-requirements-tooltip {
  margin-top: 8px;
  width: 100%;
}

.uploader-button-choose {
  margin-top: 16px;
}

.requirements-tooltip-trigger {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.requirements-tooltip-text {
  box-sizing: border-box;
  color: #77767e;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  line-height: 13px;
  text-align: center;
}

.requirements-tooltip-icon {
  box-sizing: border-box;
  height: 16px;
  margin-left: 2px;
}

.btn-settings {
  gap: 4px;
  height: 36px;
  padding: 10px 12px;
}

.choose-media {
  align-items: center;
  background-color: #4a4a5914;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
  outline: none;
  overflow: hidden;
  position: relative;
  transition-duration: .2s;
  transition-property: background-color, color;
}

.caption {
  flex-shrink: 0;
  font-weight: 400;
  opacity: 1;
  transition-duration: .2s;
  transition-property: color;
  white-space: nowrap;
}

.btn-settings .caption {
  font-size: 13px;
  line-height: 16px;
}

/* -------GRADIENT BUTTON--------*/

.photo-edit-gradient-button {
  align-items: center;
  align-self: stretch;
  animation: gradientShift__UeVAokpGM2 25s ease infinite;
  background-image: linear-gradient(270deg, #def2ff, #eadaff, #def2ff);
  background-size: 200% 200%;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 0 #0000000d;
  color: #4e4e53;
  cursor: pointer;
  display: flex;
  gap: 8px;
  height: 44px;
  justify-content: center;
  outline: none;
  padding: 12px 16px;
  transition: background-position .5s, filter .5s, transform .3s;
  width: 100%;
}

.photo-edit-gradient-button:hover {
  box-shadow: 0 2px 4px #0000000d;
  filter: brightness(1.02);
  transform: scale(1.007);
}

.photo-edit-text {
  text-decoration: none;
  color: #4e4e53;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  line-height: 20px;
  word-wrap: break-word;
  margin: 0;
  text-decoration: inherit;
  text-transform: none;
}

/* ---------PHOTO STUDIO BTN---------*/

.photo-studio-btn {
  opacity: .32;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  justify-content: center;
  width: 100%;
  gap: 6px;
  height: 44px;
  padding: 12px 16px;
  align-items: center;
  background-color: #4a4a59;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
  outline: none;
  overflow: hidden;
  position: relative;
  transition-duration: .2s;
  transition-property: background-color, color;
}

.subscribe-item {
  align-items: center;
  display: flex;
}

.subscribe-item-text {
  -webkit-text-fill-color: #0000;
  background: linear-gradient(135deg, #ff9649, #ff5e62);
  background-clip: text;
  height: 100%;
  margin-left: 2px;
}

.tag-studio-btn {
  background-color: #fafafd !important;
  color: #000 !important;
}

.choose-media:hover {
  background-color: #dcdce0;
}

/* -----------UPLOAD BY LINK---------*/

.card-media-files-editor-upload-by-link {
  margin-top: 12px;
}

.media-upload-by-link {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.media-upload-by-link-label {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  width: 100%;
}

.media-upload-by-link-fields {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.media-label {
  color: #77767e;
  font-size: 13px;
  display: inline-block;
  font-style: normal;
  font-weight: 440;
  line-height: 20px;
}

.media-upload-by-link-input {
  width: 100%;
}

.media-upload-by-link-button {
  margin-left: 8px;
}

.simple-input {
  position: relative;
}

.simple-input-field {
  border-radius: 4px;
  border: 1px solid #e3e4ea;
  box-sizing: border-box;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  outline: none;
  padding: 11px 12px;
  transition-duration: .15s;
  transition-property: border, background-color;
  width: 100%;
}

.button-link {
  opacity: .4;
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  border: 1px solid #d1cfd7;
  text-decoration: none;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: flex-start;
  outline: none;
  position: relative;
  transition: opacity .3s;
  padding: 9px;
}

.button-link-icon {
  padding: 0;
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.button-link-icon > svg {
  height: 24px;
  width: 34px;
}

/* ---------V ELSE MEDIA EDITOR-------*/

.card-media-files-editor-media-files {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

#DndLiveRegion-0 {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0px;
  padding: 0px;
  overflow: hidden;
  clip: rect(0px, 0px, 0px, 0px);
  clip-path: inset(100%);
  white-space: nowrap;
}

.sortable-item {
  min-height: 124px;
  min-width: 101px;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  z-index: 5;
}

.sortable-item:first-child {
  max-height: 426px;
  max-width: 312px;
  min-height: 426px;
  min-width: 312px;
}

.media-render-photo {
  background-color: #f7f7fa;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.media-render-photo-labels {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: flex-start;
  left: 8px;
  position: absolute;
  top: 8px;
}

.media-render-photo-dropdown {
  opacity: 0;
  transition: opacity .1s ease-in-out;
}

.media-render-photo-image {
  border-style: none;
  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: center;
  object-fit: cover;
  object-position: center;
  width: 100%;
}

.media-render-photo-main-label {
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #1b242c29;
  display: flex;
  opacity: .8;
  width: fit-content;
  background: #00000080;
  padding: 4px 8px;
}

.media-render-photo-label-icon {
  height: 16px;
  margin-right: 2px;
}

.media-render-photo-label-text {
  color: #fff;
  font-size: 13px;
  line-height: 13px;
}

.media-dropdown-actions {
  align-items: center;
  background: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #1b242c29;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  outline: 0;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 24px;
  z-index: 2;
}

.variant-item-preview {
  border-radius: 6px;
  height: 110px;
  object-fit: contain;
  width: 76px;
}

/* ----------UPLOADER BUTTON MINI-----------*/

.uploader-button-mini {
  border: 1px dashed #d1cfd7;
  border-radius: 8px;
  height: 124px;
  padding: 16px;
  width: 101px;
}

.uploader-button-button-icon-mini {
  gap: 6px;
  padding: 0;
  text-align: center;
}

.uploader-button-plus {
  align-items: center;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
  min-height: 64px;
  min-width: 64px;
}

.uploader-button-plus-mini {
  min-height: 0;
  min-width: 0;
}

.uploader-mini-text {
  text-decoration: none;
  color: #767386;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin: 0;
  text-transform: none;
}

.uploader-button-mini:hover {
  background: #f0f0f3;
}

.sortable-item {
  min-height: 124px;
  min-width: 101px;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  z-index: 5;
  touch-action: none;
}

.sortable-item:nth-child(1n+2) {
  height: 124px;
  width: 101px;
}

/* -----------FIELDS MIDDLE---------*/

.variants-description {
  padding-bottom: 16px;
}

.rich-content-v2 {
  align-items: flex-start;
  background-color: #f7f7fa;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 16px;
}

.main-fields {
  display: flex;
  flex-direction: column;
}

.main-fields-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.main-fields-text {
  text-decoration: none;
  color: #000;
  font-family: latobold, arial, sans-serif;
  font-size: 16px;
  line-height: 20px;
  word-wrap: break-word;
  margin: 0;
  text-decoration: inherit;
  text-transform: none;
  font-weight: 500;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 16px;
}

.field-wrapper-label-wrapper {
  align-items: center;
  display: flex;
  width: 100%;
}

.field-wrapper-label {
  align-items: flex-end;
  display: flex;
  margin-bottom: 8px;
  width: 100%;
}

.field-wrapper-label-text {
  box-sizing: border-box;
  color: #77767e;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.field-wrapper-field {
  width: 100%;
}

.title-input {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.title-input-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.editable {
  align-items: flex-start;
  display: flex;
  position: relative;
  width: 100%;
}

.editable-input {
  background: #0000;
  border: 1px solid #d1cfd7;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  outline: none;
  padding: 10px 30px 10px 12px;
  position: relative;
  resize: none;
  width: 100%;
  word-break: break-word;
  z-index: 2;
}

/* ------CATEGORY------*/

.laag-tooltip-label {
  align-items: center;
  display: flex;
  justify-content: center;
  width: min-content;
}

.field-wrapper-label-icon {
  display: block;
  height: 16px;
  margin-left: 4px;
  position: relative;
  top: -1px;
  width: 16px;
}

.supplier-subject-select {
  position: relative;
  width: 100%;
}

.supplier-subject-select-wrapper {
  align-items: center;
  display: flex;
}

/* --------ARTICLES--------*/

.main-fields-articles {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.form-input {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-input-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.input {
  display: flex;
  position: relative;
}

.input-field {
  border: 1px solid #d1cfd7;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  outline: none;
  overflow: hidden;
  padding: 10px 30px 10px 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.input-field-empty {
  padding: 10px 12px;
}

.input-button-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  position: absolute;
  right: 0;
}

.form-input-custom-action {
  background: #0000;
  border: none;
  cursor: pointer;
  height: 16px;
  outline: none;
  outline: 0;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 12px;
  width: 16px;
}

span.laag-tooltip.laag-tooltip-label {
  width: 16px;
  height: 16px;
}

/* -----DESCRIPTION------*/

.description-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

.description-header, .description-generate-actions {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.description-input-description-wrapper {
  align-items: center;
  border: 1px solid #d1cfd7;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.description-generate-actions {
  border: 1px solid #d1cfd7;
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin-top: 6px;
  padding: 12px;
}

.description-label {
  color: #77767e;
  display: flex;
  gap: 8px;
  align-items: center;
}

.text {
  text-decoration: none;
  color: #77767e;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: .01em;
  line-height: 16px;
  word-wrap: break-word;
  margin: 0;
  text-decoration: inherit;
  text-transform: none;
}

.description-label-icon {
  display: flex;
}

.editable-input-settings {
  width: 100%;
  max-width: 795px;
  transform: translate(0px, 0px);
  pointer-events: none;
  user-select: none;
  box-sizing: content-box;
  text-size-adjust: 100%;
  direction: ltr;
  padding: 10px 30px 10px 12px;
  margin: 0px;
  border: 0px none transparent;
  font-size: 16px;
  font-family: lato, arial, sans-serif;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-size-adjust: none;
  text-align: start;
  text-transform: none;
  text-indent: 0px;
  letter-spacing: normal;
  word-spacing: 0px;
  line-height: 18px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  tab-size: 8;
}

.editable-input-is-description {
  border: 0;
  border-radius: 0;
}

/* ---------DESC GENERATE--------*/

.description-generate-actions-generate-wrapper {
  display: flex;
}

.text-bold {
  font-size: 13px;
  font-weight: 560;
  letter-spacing: .01em;
  line-height: 16px;
}

.text-black {
  color: #000;
}

.description-generate-actions-generation-total-wrapper:before {
  content: " ";
}

.rt-icon {
  display: flex;
  flex-shrink: 0;
  color: inherit;
}

.rt-icon-size-sm {
  width: 16px;
  height: 16px;
}

.choose-media[disabled] {
  opacity: .32;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}

/* --------RICH V2--------*/

.rich-content-v2-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  width: 100%;
}

.rich-content-v2-title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: space-between;
}

.rich-content-v2-description {
  display: flex;
}

.rich-content-v2-icon-wrapper {
  align-items: center;
  display: flex;
  gap: 4px;
}

.text-v2 {
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
}

.text-purple {
  color: #9a41fe;
}

.rich-btn {
  align-items: center;
  background-color: #9a41fe;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
  outline: none;
  overflow: hidden;
  position: relative;
  transition-duration: .2s;
  transition-property: background-color, color;
  gap: 4px;
  height: 36px;
  padding: 10px 12px;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}

.rich-btn[disabled] {
  opacity: .32;
}

.rich-btn .caption {
  font-size: 13px;
  line-height: 16px;
}

/*---------LAYERS--------*/

.supplier-subject-select-dropdown {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 25px 60px 0 #dfdfe2;
  max-width: 710px;
  width: 100%;
  z-index: 49;
}

.supplier-subject-select-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 8px;
  width: 100%;
}

.tree-select {
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
}

.subject-dropdown-header {
  background: #f7f7fa;
  border: 1px solid #f0f0f3;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-height: 92px;
  padding: 12px;
  position: relative;
  width: 100%;
}

.subject-dropdown-header-icon {
  background-image: url(data:image/png;base64,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);
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 86px;
  width: 100%;
}

.subject-dropdown-header-text {
  z-index: 1;
}

.subject-dropdown-header-link {
  margin-top: 10px;
  width: fit-content;
}

.text-h5 {
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  line-height: 16px;
}

.lil-spacing {
  letter-spacing: .0001em;
}

.text-blue {
  color: #5067de;
}

/*---------TREE SELECT--------*/

.tree-select-input-row {
  align-items: center;
  display: flex;
}

.tree-select-columns {
  display: flex;
  flex-direction: row;
  height: 322px;
  margin-top: 4px;
}

.tree-select-blur {
  background: linear-gradient(180deg, #fff0, #fff 70%);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  bottom: 0;
  height: 20px;
  left: 0;
  position: absolute;
  width: 100%;
}

.tree-select-input {
  width: 100%;
}

.tree-select-button {
  margin-left: 12px;
  margin-right: 4px;
}

.new-input {
  display: flex;
  position: relative;
  flex-direction: column;
}

.new-input-input-wrapper {
  display: flex;
  position: relative;
}

.new-input-field[type="search"] {
  appearance: none;
  background-color: rgba(0, 0, 0, 0);
}

.new-input-button-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  position: absolute;
  right: 0px;
}

.new-input-icon-remove {
  align-items: center;
  background-color: rgb(209, 207, 215);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 16px;
  justify-content: center;
  margin-right: 10px;
  outline: none;
  padding: 0px;
  transition: 0.5s;
  width: 16px;
}

.new-input-icon-remove-search {
  background-color: rgba(0, 0, 0, 0);
}

.new-input-field-searching {
  padding-right: 35px;
}

.new-input-field-small {
  padding: 6px 10px !important;
}

.new-input-field {
  border: 1px solid rgb(240, 240, 243);
  border-radius: 8px;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  outline: none;
  overflow: hidden;
  padding: 11px 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.tree-select-cancel-button {
  align-items: center;
  background: #0000;
  border: none;
  color: #f96666;
  cursor: pointer;
  display: flex;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  outline: none;
  padding: 0;
}

.tree-select-column {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.tree-select-column:not(:last-child) {
  border-right: 1px solid #f0f0f3;
}

.render-column {
  box-sizing: border-box;
  display: inline-grid;
  grid-auto-rows: min-content;
  height: 100%;
  overflow-y: auto;
  padding: 8px 0;
  position: relative;
  width: 100%;
}

ul {
  list-style: none;
}

/*---------ДОДЕЛКИ----------*/

.supplier-subject-select-subject {
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  margin-right: 12px;
}

.adult-checkbox {
  margin-left: 10px;
}

.checkboxWithLabel {
  align-items: flex-start;
  display: inline-flex;
  padding: 8px 0px;
}

.checkboxWrapper {
  display: inline-flex;
}

.content {
  cursor: pointer;
  padding: 2px 0 0 8px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
}

.checkbox {
  gap: 8px;
  display: inline-flex;
  position: relative;
  transition-duration: .15s;
  transition-property: background-color;
}

.checkbox .control {
  height: 100%;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
  width: 100%;
}

.checkbox .icon {
  display: flex;
  pointer-events: none;
  position: relative;
}

.iconFill {
  height: 24px;
  width: 24px;
  transition-duration: .15s;
  transition-property: stroke, fill, transform, opacity;
  fill: #fff;
  stroke: #bbb7c9;
}

.item-option {
  align-items: center;
  background: #0000;
  border: none;
  border-radius: 4px 0 0 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-family: lato, arial, sans-serif;
  height: 36px;
  outline: none;
  overflow: hidden;
  padding: 8px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.item-option-selected {
  background: #f7f7fa;
}

.item-option:hover {
  background: #f7f7fa;
}

.item-option:disabled {
  color: #000;
}

/* -------ДОП ВАРИАНТЫ-------*/

.variants-certificates {
  margin-bottom: 16px;
  margin-top: 48px;
}

.sizes-old {
  display: flex;
  flex-direction: column;
}

.sizes-old-title {
  display: block;
  margin-bottom: 16px;
}

.sizes-array {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sizes-old-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.text-h4-bold {
  font-family: latobold, arial, sans-serif;
  font-size: 16px;
  line-height: 20px;
}

.size-row {
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  gap: 8px;
}

.size-row-price {
  flex: 1 1 112px;
  max-width: 112px;
  min-width: 112px;
  width: 100%;
}

.size-row-skus {
  flex: 1 1 90px;
  min-width: 90px;
}

.input-icon-remove {
  align-items: center;
  background-color: #d1cfd7;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 16px;
  justify-content: center;
  margin-right: 10px;
  outline: none;
  padding: 0;
  transition: .5s;
  width: 16px;
}

.form-barcode-select {
  display: block;
}

.barcode-select {
  border: 1px solid #d1cfd7;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  line-height: 22px;
  outline: none;
  padding: 9px 12px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.barcode-select-selected {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.barcode-select-text {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.barcode-select-input-wrapper {
  align-items: center;
  display: flex;
  width: 100%;
}

.barcode-select-dropdown {
  position: absolute;
  top: calc(100% + 5px); /* Размещаем dropdown под элементом */
  left: 0;
  width: 260px;
  background: white;
  border: 1px solid #d1cfd7;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000; /* Убедитесь, что dropdown поверх других элементов */
  max-height: 200px; /* Ограничение высоты при необходимости */
  overflow-y: auto;
}

.barcode-select-field {
  border: none;
  box-sizing: border-box;
  height: 20px;
  outline: none;
  width: 100%;
}

.barcode-select-plus {
  cursor: default;
  opacity: .6;
}

.dropdown-list {
  background-color: #fff;
  border: 1px solid #f0f0f3;
  border-radius: 4px;
  box-shadow: 0 20px 20px #0000000a;
  list-style-type: none;
  margin: 0;
  max-height: 240px;
  overflow-y: auto;
  padding: 0;
  position: relative;
}

.dropdown-option {
  background-color: #0000;
  border: none;
  box-sizing: border-box;
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  padding: 12px;
  position: relative;
  text-align: left;
  vertical-align: middle;
  width: 100%;
}

.dropdown-option:hover {
  background-color: #f0f0f3;
}

.barcode-dropdown-option {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.barcode-dropdown-option-title {
  background-color: #0000;
  border: none;
  cursor: pointer;
  margin-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 135px;
}

.barcode-dropdown-option-button {
  background-color: #0000;
  border: none;
  cursor: pointer;
  outline: none;
}

.barcode-select-additional {
  align-items: center;
  background: #f0f0f3;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000;
  display: flex;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  height: 20px;
  line-height: 13px;
  margin-left: 4px;
  padding: 2px 8px;
}

.variants-sizes {
  margin-bottom: 24px;
  margin-top: 24px;
}

/* ------DIMENSIONS------*/

.dimensions {
  display: flex;
  flex-direction: column;
}

.dimensions-title {
  display: block;
  margin-bottom: 8px;
}

.dimensions-sub-title {
  margin-bottom: 12px;
}

.dimensions-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dimensions-field {
  flex: 1 1 90px;
  min-width: 90px;
}

.separated-charcs {
  column-gap: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 0;
  min-width: 0;
  width: 100%;
}

/*---------DOCUMENTS---------*/

.certificates {
  display: flex;
  flex-direction: column;
}

.certificate-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.certificates-type {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 24px;
}

.certificate-number {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
}

.certificates-date {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  margin-top: 16px;
  width: 100%;
}

.checkboxWithLabel {
  align-items: flex-start;
  display: inline-flex;
  padding: 8px 0;
}

.certificate-header-process-notify {
  align-items: center;
  display: flex;
  gap: 8px;
}

.certificate-header-title {
  align-items: center;
  display: flex;
  gap: 8px;
}

.text-l-bold {
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
}

.text-body-m {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
}

.text-body-s {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .01em;
  line-height: 16px;
}

.select {
  position: relative;
}

.select-input {
  border: 1px solid #e3e4ea;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: default;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-right: 8px;
  outline: none;
  padding: 11px 35px 11px 9px;
  transition-duration: .15s;
  transition-property: border, background-color;
  width: 100%;
}

.select-icon-wrapper {
  align-items: center;
  bottom: 10px;
  display: flex;
  justify-content: center;
  margin-left: 12px;
  min-width: 20px;
  position: absolute;
  right: 12px;
  top: 10px;
}

.certificate-number-input-wrapper {
  position: relative;
}

.certificate-number-label {
  border: 1px solid #0000;
  cursor: text;
  display: flex;
  flex-wrap: nowrap;
  left: 0;
  padding: 11px 12px;
  pointer-events: none;
  position: absolute;
  top: 0;
}

.button-link-text {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 560;
  justify-content: flex-start;
  line-height: 20px;
  outline: none;
  position: relative;
  transition: opacity .3s;
}

.certificates-date-start, .certificates-date-end {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 50%;
  min-width: 40%;
  width: 50%;
}

.simple-input-field-disabled, .simple-input-field:disabled {
  background-color: #f7f7fa;
  border-color: #f0f0f3;
  color: #767386;
}

/*---------ХАРАКТЕРИСТИКИ---------*/

.characteristics-expand {
  width: 100%;
}

.form-multi-select {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}

.form-multi-select-field {
  width: 100%;
}

.new-search-multi-input {
  position: relative;
}

.new-multi-select-input {
  background-color: #fff;
  border: 1px solid #d1cfd7;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  outline: none;
  padding: 7px 12px;
  position: relative;
}

.new-multi-select-input-value-container {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1 1;
  flex-wrap: wrap;
  min-height: 28px;
  overflow: hidden;
  position: relative;
}

.hidden-measure-value-list {
  box-sizing: border-box;
  display: flex;
  height: 42px;
  left: 0;
  position: absolute;
  top: 0;
  visibility: hidden;
}

.multi-select-tag {
  background-color: #f0f0f3;
  border-bottom: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  height: 24px;
  padding: 4px 8px;
}

.item-selected-text {
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  height: 16px;
  line-height: 16px;
  margin-right: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
}

.selected-item-remove {
  background-color: #0000;
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: 6px;
  margin-top: -1px;
  padding: 0;
  -webkit-appearance: button;
}

/* -------DODELKI--------*/

.variant-item-content-charcs-wrapper {
  height: 60px;
  margin-top: 4px;
  overflow-y: scroll;
  scrollbar-width: none;
  width: 100%;
}

.variant-item-content-charcs-wrapper-sec {
  display: flex;
}

.variant-item-content-charcs-wrapper-sec:first-child {
  margin-top: 0;
}

.variant-item-content-charcs-text {
  color: #4e4e53;
  display: flex;
  gap: 4px;
  justify-content: flex-start;
  width: 100%;
  font-family: lato, arial, sans-serif;
  font-size: 13px;
  line-height: 16px;
  overflow: hidden;
}

.variant-item-content-charcs-value {
  color: #000;
  font-family: lato, arial, sans-serif;
  font-size: 14px;
  line-height: 16px;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>