import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { uploadFirebaseImage } from '../../../api/uploadFirebaseImage/uploadFirebaseImage'
import { updateFirebaseDoc } from '../../../api/updateFirebaseDoc/updateFirebaseDoc'
import { showToast } from '../../../components/Toast/toastMethods'
import { Toast } from '../../../components/Toast/Toast'
import { ServiceSelector, mainService } from '../../../redux/reducers/servicesSlice'

export const ServiceMain = () => {
    const service = useAppSelector(ServiceSelector) 
    
    const dispatch = useAppDispatch()
    const initialState = {   
      titulo: service.main.titulo,
      subtitulo: service.main.subtitulo
      
    }
    const [forms, setForms] = useState(initialState)
    
    const [imageUpload, setImageUpload] = useState<File>()
  
    const handleReset = () => {
      setForms(initialState)
    }
  
    const handleChange = (evt: any) => {
      setForms({
        ...forms,
        [evt.target.name]: evt.target.value
      })
    }
  
    const handleSetFile = (evt: any) =>{
      setImageUpload(evt.target.files[0])
      handleChange(evt)
    }
    
    
  const handleUpdate = async () => {
      let res: string | undefined = service.main.download_url
      if(imageUpload != undefined){
        res = await uploadFirebaseImage(imageUpload!,'/Servicios/Principal/image')
      }
      const data = {
        titulo: forms.titulo,
        subtitulo: forms.subtitulo,
        download_url: res,
        image_url: service.main.image_url   
      }
    //update de la bd
    await updateFirebaseDoc('/Servicios/xsc94XcgZ4Agn9IisLop',data)
    //update del selector
    dispatch(mainService(data))
    showToast('toast-servicemain-update')
  }
    
  return (
    <>
  <div className="text-center rounded mb-5">  
      <img src={service.main.download_url} className="img-fluid" />      
      <h1 className="display-1 text-black">{service.main.titulo}</h1>
      <h3 className="display-6 text-black">{service.main.subtitulo}</h3>
      <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
        Actualizar Inicio
      </button>  
    </div>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0">
              <h1 className="modal-title fs-5 text-black" id='title-modal-servicemain' >
              Actualizar Inicio de Servicios          
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReset}></button>
          </div>
          <div className="modal-body">
            <div className='form-row text-black'>                      
              <label className='form-label' htmlFor={`title-service-add`}>Título</label>
              <textarea className='form-control rounded-0 h-10' id={`title-service-add`} name="titulo"   value={forms.titulo}  onChange={(evt)=> handleChange(evt)}/>
              <label className='form-label' htmlFor={`subtitle-service-add`}>Subtitulo</label>
              <textarea className='form-control rounded-0 ' id={`subtitle-service-add`} name='subtitulo' value={forms.subtitulo} onChange={(evt) => handleChange(evt)} />        
              <label className='form-label' htmlFor={`uploadImage-add`}>Subir imagen</label>
              <input className="form-control" id={`uploadImage-add`}  name='image_url' type="file" onChange={(evt)=> handleSetFile(evt)}/>                    
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleReset}>Cancelar</button>
            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={()=>handleUpdate()}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
    <Toast 
    id='toast-servicemain-update' 
    message='¡Se ha actualizado con éxito la sección principal de Servicios!' 
    title='Servicios - Seccion Principal'
    />    
    </>
  )
}
