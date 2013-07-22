$(function () {
    $('.filters .filter').popover({
        html: true,
        trigger: 'manual',
        content: function () {
            return '<div class="thumbnail"><div class="image"><img alt="" src="/images/1.png"></div><div class="description"><div class="title"><span>2012 NISSAN Juke</span></div><div class="field"><div class="name">Mileage</div><div class="value">2000 km</div></div><div class="field"><div class="name">Price</div><div class="value">2,400,000 LKR</div></div><div class="field"><div class="name">Seller</div><div class="value">serandives</div></div></div></div>';
        }
    });
    $(document).on('click', '.filter',function (e) {
        var that = this;
        $('.filters .filter').each(function () {
            if (that === this) {
                return;
            }
            $(this).popover('hide');
        });
        that = $(that);
        if (that.has)
            that.popover('show');
        e.stopPropagation();
    }).click(function () {
            $('.filters .filter').each(function () {
                $(this).popover('hide');
            });
        });
    $('.filters').on('click', '.popover', function (e) {
        e.stopPropagation();
    });

    $('.price').slider();

});