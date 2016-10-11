var currentLanguage = window.currentLanguage = 'en';
var score = window.score = new Score({
  persistant: true,
  callback: function () {},
  levels: [
    {
      'checkmark': 0,
      'status': 'APPREHENTICE',
      'quote': 'APPREHENTICE_QUOTE',
    }, {
      'checkmark': 1,
      'status': 'BEGINNER',
      'quote': 'BEGINNER_QUOTE',
    }, {
      'checkmark': 2,
      'status': 'INTERMEDIANTT',
      'quote': 'INTERMEDIANTT_QUOTE',
    }, {
      'checkmark': 3,
      'status': 'POLISHEED',
      'quote': 'POLISHEED_QUOTE',
    }, {
      'checkmark': 4,
      'status': 'ADVANCED',
      'quote': 'ADVANCED_QUOTE',
    }, {
      'checkmark': 5,
      'status': 'HIGH_SKILLED',
      'quote': 'HIGHT_SKILLED_QUOTE',
    }, {
      'checkmark': 6,
      'status': 'Expert',
      'quote': 'EXPERT_QUOTE',
    }
  ]
});

//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}

angular
  .module('hairaEducatec', [
    'ngFeathers',
    'ngSanitize',
    'pascalprecht.translate',
    'hasItem.factory',
    'unique.filter',
    'menu.controller',
    'catalog.controller',
    'directives'
  ])
  .run(function ($log, $feathers) {
    $log.debug('application running');
    $log.debug(score.scorecard());
  })
  .config(function (
    $feathersProvider,
    $translateProvider
  ) {
    $feathersProvider.setEndpoint('http://localhost:8080/');
    // $feathersProvider.setSocketOpts({
    //   path: '/socket.io/'
    // });
    $feathersProvider.useSocket(true);
    $translateProvider.translations('en', {
      SIGN_IN: 'Sign in',
      SIGN_UP: 'Sign up',
      APPREHENTICE_QUOTE: 'Apprehentice level anchieved.',
      UTILIZATION_QUOTE: 'Utilization experience level of the tool.',
      FIRST_TITLE: 'Games',
      SUB_TITLE: 'Find a game:',
      SECOND_TITLE: 'Reviews',
      THIRD_TITLE: 'Profile',
      SUB_SECOND_TITLE: 'Find a review:',
      GLOBAL_SEARCH_LABEL: 'Search on application...',
      RESET: 'Reset',
      KEYWORD: 'Keyword...',
      MOST_RATED: 'Most rated',
      TOP_COMMENTED: 'Top commented',
      BEST_CRITICISED: 'Best criticised',
      SCORE: 'Score',
      CHANGE_TO: 'Alters to: Portuguese',
      REVIEW: 'Review',
      STASH_TITLE: 'Title',
      STASH_BADGES: 'Consoles',
      STASH_REVIEW: 'Review',
      STASH_PUBLISHER: 'Publisher',
      STASH_DEVELOPER: 'Developer',
      STASH_ACCESS_ABOVE: 'Access',
      STASH_ACCESS_BELOW: 'Reference',
      STASH_EXTERNAL_RESOURCES: 'External resources',
      STASH_EXPLORE: 'Explore',
      PARAGRAPHS: 'Paragraphs',
      CHARACTERS: 'Characters',
      COMPARATIVE: 'Comparative',
      POSITIVE_TOKENS: 'Positive words',
      NEGATIVE_TOKENS: 'Negative words',
      SLUG_TITLE: 'Slug',
      SLUG_PLACEHOLDER: 'Slug...',
      GRAB: 'Grab',
      REVIEW: 'Review',
      SEARCH: 'Search',
      FULL_REVIEW: 'Full review',
      LOGIN_TITLE: 'Login',
      EMAIL: 'Email',
      EMAIL_PLACEHOLDER: 'Fill with your email...',
      PASSWORD: 'Password',
      PASSWORD_PLACEHOLDER: 'Fill with your password...',
      CLOSE: 'Close',
      PUBLICATIONS: 'Publications',
      PUBLICATIONS_SUB_TITLE: 'Find publications',
      PUBLICATIONS_PLACEHOLDER: 'Fill with a keyword...',
      PUBLICATIONS_DESCRIPTION: 'Catalog of publications',
      PUBLICATIONS_FIELD_TITLE: 'Title',
      PUBLICATIONS_FIELD_DESCRIPTION: 'Description',
      PUBLICATIONS_FIELD_PREVIEW: 'Preview',
      PUBLICATIONS_FIELD_VIEW: 'View',
      LOGGED_USER_LABEL: 'Logged user:',
      APPREHENTICE_QUOTE: 'Apprehentice',
    });
    $translateProvider.translations('ptBr', {
      SIGN_IN: 'Acessar',
      SIGN_UP: 'Registrar',
      APPREHENTICE_QUOTE: 'Nível de aprendiz conquistado.',
      UTILIZATION_QUOTE: 'Nível de experiencia na utilização da ferramenta.',
      FIRST_TITLE: 'Jogos',
      SUB_TITLE: 'Encontre um jogo:',
      SECOND_TITLE: 'Revisões',
      THIRD_TITLE: 'Perfil',
      SUB_SECOND_TITLE: 'Encontre uma revisão:',
      GLOBAL_SEARCH_LABEL: 'Buscar em toda aplicação...',
      RESET: 'Limpar',
      KEYWORD: 'Palava-chave...',
      MOST_RATED: 'Pontuação alta',
      TOP_COMMENTED: 'Mais comentado',
      BEST_CRITICISED: 'Melhor criticado',
      SCORE: 'Pontos',
      CHANGE_TO: 'Alterar para: Inglês',
      REVIEW: 'Revisão',
      STASH_TITLE: 'Título',
      STASH_BADGES: 'Plataformas',
      STASH_REVIEW: 'Revisão',
      STASH_PUBLISHER: 'Editor',
      STASH_DEVELOPER: 'Desenvolvedor',
      STASH_ACCESS_ABOVE: 'Acessar',
      STASH_ACCESS_BELOW: 'Referência',
      STASH_EXTERNAL_RESOURCES: 'Recursos externos',
      STASH_EXPLORE: 'Explorar',
      PARAGRAPHS: 'Parágrafos',
      CHARACTERS: 'Caractéres',
      COMPARATIVE: 'Comparativo',
      POSITIVE_TOKENS: 'Palavras positivas',
      NEGATIVE_TOKENS: 'Palavras negativas',
      SLUG_TITLE: 'Caminho',
      SLUG_PLACEHOLDER: 'Caminho...',
      GRAB: 'Pegar',
      REVIEW: 'Revisão',
      SEARCH: 'Busca',
      FULL_REVIEW: 'Revisão completa',
      LOGIN_TITLE: 'Acessar',
      EMAIL: 'Email',
      EMAIL_PLACEHOLDER: 'Utilize o seu email...',
      PASSWORD: 'Senha',
      PASSWORD_PLACEHOLDER: 'Utilize a sua senha...',
      CLOSE: 'Fechar',
      PUBLICATIONS: 'Publicações',
      PUBLICATIONS_SUB_TITLE: 'Procurar publicações',
      PUBLICATIONS_PLACEHOLDER: 'Utilize uma palavra-chave...',
      PUBLICATIONS_DESCRIPTION: 'Catálogo de públicações',
      PUBLICATIONS_FIELD_TITLE: 'Título',
      PUBLICATIONS_FIELD_DESCRIPTION: 'Descrição',
      PUBLICATIONS_FIELD_PREVIEW: 'Pré-visualização',
      PUBLICATIONS_FIELD_VIEW: 'Visualização',
      LOGGED_USER_LABEL: 'Usuário:',
      APPREHENTICE_QUOTE: 'Aprendiz',
    });
    $translateProvider.preferredLanguage(currentLanguage);
    $translateProvider.useSanitizeValueStrategy('escape');
  });

angular.element(document).ready(function () {
  angular.bootstrap(document, ['hairaEducatec']);
});
