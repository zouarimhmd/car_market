import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { apartments, latestCar } from './single.model';
import { apartmentsData, latestCarData } from './data';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})

/**
 * Single Component
 */
export class SingleComponent implements OnInit {

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  apartmentsData!: apartments[];
  latestCarData!: latestCar[];
  public firstColleaps = true;
  public msgColleaps = true;

  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Used cars', link: '' },
      { label: 'Mercedes-Benz E 400 Cabriolet', active: true }
    ];

    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    // Data Get Function
    this._fetchData();
    if (document.documentElement.scrollTop > 40) {
      document.querySelector('.navbar')?.classList.add('navbar-stuck');
    }
  }

  // Data Fetch
  private _fetchData() {
    this.apartmentsData = apartmentsData;
    this.latestCarData = latestCarData;
  }

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    navigation: true,
    arrows: false
  };


  /**
   * Latest Car Swiper setting
   */
  LatestCar = {
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots:true,
    infinite: true,
    autoplay: false, // Add this if you want autoplay
    autoplaySpeed: 2000, // Add this if you want to set autoplay speed
    variableWidth: false, // Change to true if you want variable width slides
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  /**
  * Bootsrap validation form submit method
  */
  validSubmit() {
    this.submit = true;
  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

}
